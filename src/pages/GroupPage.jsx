import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import CreateEntryDrawer from "../components/CreateEntryDrawer";

export default function GroupPage() {
  const { id: groupId } = useParams();

  const [group, setGroup] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEntryDrawer, setOpenEntryDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    entryId: null,
  });

  // Carregar grupo
  useEffect(() => {
    async function loadGroup() {
      const ref = doc(db, "groups", groupId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setGroup({ id: snap.id, ...snap.data() });
      }

      setLoading(false);
    }

    loadGroup();
  }, [groupId]);

  // Carregar devocionais
  useEffect(() => {
    const q = query(
      collection(db, "groups", groupId, "entries"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(list);
    });

    return () => unsub();
  }, [groupId]);

  async function handleDeleteEntry(entryId) {
    try {
      await deleteDoc(doc(db, "groups", groupId, "entries", entryId));
      setDeleteModal({ open: false, entryId: null });
    } catch (err) {
      alert("Erro ao excluir devocional: " + err.message);
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!group) return <p className="p-6">Grupo não encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-4 py-10 relative">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho do grupo */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#E6E4DE] shadow-sm">
          <h1 className="text-2xl font-serif text-[#3A5A40] mb-1">
            {group.name}
          </h1>

          <p className="text-sm text-[#3D3D3D]/80 mb-3">{group.description}</p>

          <p className="text-xs text-[#3D3D3D]/70">
            Código de convite:{" "}
            <span className="font-medium text-[#3A5A40]">
              {group.inviteCode}
            </span>
          </p>

          <button
            onClick={() => setOpenEntryDrawer(true)}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2 
                       bg-[#3A5A40] text-white rounded-xl font-medium
                       hover:bg-[#2F4A33] transition cursor-pointer"
          >
            Novo devocional +
          </button>
        </div>

        {/* Lista de devocionais */}
        <section>
          <h2 className="text-xl font-serif text-[#3A5A40] mb-4">
            Devocionais do grupo
          </h2>

          {entries.length === 0 ? (
            <p className="text-sm text-[#3D3D3D]/70">
              Nenhum devocional criado ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl p-5 border border-[#E6E4DE] 
                             shadow-sm hover:shadow-md transition relative"
                >
                  <h3 className="text-lg font-serif text-[#3A5A40] mb-1">
                    {entry.passage || "Leitura"}
                  </h3>

                  <p className="text-sm text-[#3D3D3D]/80 leading-relaxed line-clamp-4">
                    {entry.learned}
                  </p>

                  <p className="text-xs text-[#3D3D3D]/60 mt-3">
                    {entry.createdAt?.toDate().toLocaleDateString("pt-BR")}
                  </p>

                  {/* Excluir */}
                  <button
                    onClick={() =>
                      setDeleteModal({ open: true, entryId: entry.id })
                    }
                    className="absolute top-3 right-3 p-2 rounded-full
                               text-red-500 hover:bg-red-500 hover:text-white
                               transition cursor-pointer"
                    title="Excluir devocional"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Drawer novo devocional */}
      <CreateEntryDrawer
        open={openEntryDrawer}
        onClose={() => setOpenEntryDrawer(false)}
        groupId={groupId}
      />

      {/* Modal de exclusão */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-3">Excluir devocional?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteEntry(deleteModal.entryId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl
                           hover:bg-red-600 transition cursor-pointer"
              >
                Excluir
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, entryId: null })}
                className="flex-1 px-4 py-2 border rounded-xl
                           hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
