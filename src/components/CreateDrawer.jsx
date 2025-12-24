import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function CreateDrawer({ open, onClose }) {
  const { user } = useAuth();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function generateInviteCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async function handleCreateGroup(e) {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("O nome do grupo é obrigatório.");
      return;
    }

    try {
      const inviteCode = generateInviteCode();

      await addDoc(collection(db, "groups"), {
        name: groupName,
        description,
        inviteCode,
        createdAt: Timestamp.now(),
        createdBy: user.uid,
        members: [user.uid],
      });

      setGroupName("");
      setDescription("");
      setError("");
      onClose();
    } catch (err) {
      setError("Erro ao criar grupo: " + err.message);
    }
  }

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      <div
        className={`
          fixed top-0 right-0 h-full bg-white z-50 shadow-xl
          w-[35%] max-w-[450px]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-serif text-[#3A5A40]">
            Criar novo grupo
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-[#3A5A40] hover:text-[#2F4A33]"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <form onSubmit={handleCreateGroup} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label className="block text-sm mb-1 text-[#3A5A40]">
                Nome do grupo
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB] focus:outline-none"
                placeholder="Ex: Leitura do Evangelho"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-[#3A5A40]">
                Descrição
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB] focus:outline-none"
                placeholder="Detalhes do grupo..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#3A5A40] text-white px-4 py-2 rounded-md w-full hover:bg-[#2F4A33] transition"
            >
              Criar grupo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}