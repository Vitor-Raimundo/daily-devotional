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

  // Carregar informações do grupo
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

  // Carregar devocionais do grupo
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

  // Função para deletar devocional
  async function handleDeleteEntry(entryId) {
    try {
      await deleteDoc(doc(db, "groups", groupId, "entries", entryId));
      setDeleteModal({ open: false, entryId: null });
    } catch (err) {
      alert("Erro ao excluir devocional: " + err.message);
    }
  }

  if (loading) return <p className="p-4">Carregando...</p>;
  if (!group) return <p className="p-4">Grupo não encontrado.</p>;

  return (
    <div className="min-h-screen p-6 relative">
      {/* Cabeçalho do Grupo */}
      <div className="bg-white p-6 mb-6 border border-[#E6E4DE]">
        <h1 className="text-2xl font-serif mb-1">{group.name}</h1>
        <p className="text-sm mb-3">{group.description}</p>
        <p className="text-xs">
          Código de convite:{" "}
          <span className="font-semibold">{group.inviteCode}</span>
        </p>
        <button
          onClick={() => setOpenEntryDrawer(true)}
          className="mt-4 cursor-pointer px-4 py-4 rounded-md bg-gray-200 transition"
        >
          Novo devocional +
        </button>
      </div>

      {/* Lista de devocionais */}
      <section>
        <h2 className="text-xl font-serif mb-4">Devocionais do grupo</h2>

        {entries.length === 0 ? (
          <p className="text-gray-600">Nenhum devocional criado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-5 border border-[#E6E4DE] shadow-sm hover:shadow-md transition relative"
              >
                <h3 className="text-lg font-serif mb-1">{entry.title}</h3>

                {entry.reference && (
                  <p className="text-sm mb-2">{entry.reference}</p>
                )}

                <p className="text-sm leading-relaxed line-clamp-3">
                  {entry.text}
                </p>

                <p className="text-xs mt-3">
                  {entry.createdAt?.toDate().toLocaleDateString("pt-BR")}
                </p>

                {/* Botão de excluir */}
                <button
                  onClick={() =>
                    setDeleteModal({ open: true, entryId: entry.id })
                  }
                  className="absolute top-3 right-3 p-2 rounded-full transition 
                             hover:bg-red-500 hover:text-white text-red-500"
                  title="Excluir devocional"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Drawer novo devocional */}
      <CreateEntryDrawer
        open={openEntryDrawer}
        onClose={() => setOpenEntryDrawer(false)}
        groupId={groupId}
      />

      {/* Modal de confirmação de exclusão */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Excluir devocional?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Tem certeza que deseja excluir este devocional? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => handleDeleteEntry(deleteModal.entryId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Excluir
              </button>
              <button
                onClick={() => setDeleteModal({ open: false, entryId: null })}
                className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100 transition"
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
