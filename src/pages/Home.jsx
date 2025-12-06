import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// Drawers
import CreateDrawer from "../components/CreateDrawer";
import JoinDrawer from "../components/JoinDrawer";

export default function Home() {
  const { user, logout } = useAuth();

  const [groups, setGroups] = useState([]);

  // Controle dos drawers
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [openJoinDrawer, setOpenJoinDrawer] = useState(false);

  // Carrega grupos do usuário
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "groups"),
      where("members", "array-contains", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(list);
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 flex justify-end items-center">
        <nav className="flex items-center gap-">
          <button
            onClick={() => setOpenCreateDrawer(true)}
            className="text-sm p-3 hover:underline"
          >
            Criar grupo
          </button>

          <button
            onClick={() => setOpenJoinDrawer(true)}
            className="text-sm p-3 hover:underline"
          >
            Entrar em grupo
          </button>

          <button
            onClick={logout}
            className="text-sm p-3 text-red-500 hover:underline"
          >
            Sair
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-serif mb-6">
          Bem-vindo, {user?.email} 🌿
        </h2>

        {/* Meus grupos */}
        <section>
          <h3 className="text-xl font-serif">Meus grupos</h3>

          {groups.length === 0 ? (
            <p className="text-gray-600">
              Você ainda não participa de nenhum grupo.
            </p>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white p-5 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-medium">{group.name}</p>
                    <p className="text-sm">{group.description}</p>
                  </div>

                  <Link
                    to={`/group/${group.id}`}
                    className="font-medium hover:underline"
                  >
                    Abrir →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Drawers */}
      <CreateDrawer
        open={openCreateDrawer}
        onClose={() => setOpenCreateDrawer(false)}
      />

      <JoinDrawer
        open={openJoinDrawer}
        onClose={() => setOpenJoinDrawer(false)}
      />
    </div>
  );
}
