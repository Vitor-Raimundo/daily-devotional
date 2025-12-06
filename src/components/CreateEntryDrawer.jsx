import { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function CreateEntryDrawer({ open, onClose, groupId }) {
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function handleCreateEntry(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Título é obrigatório.");
      return;
    }

    try {
      await addDoc(collection(db, "groups", groupId, "entries"), {
        title,
        reference,
        text,
        createdAt: Timestamp.now(),
      });

      setTitle("");
      setReference("");
      setText("");
      setError("");

      onClose();
    } catch (err) {
      setError("Erro ao criar devocional: " + err.message);
    }
  }

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40"></div>
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
          <h2 className="text-lg font-serif">Novo Devocional</h2>

          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>

        <div className="p-5">
          <form onSubmit={handleCreateEntry} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label className="block text-sm mb-1">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB]"
                placeholder="Título do devocional"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Referência Bíblica (opcional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB]"
                placeholder="Ex: João 3:16"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 ">Texto / Anotação</label>
              <textarea
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB]"
                placeholder="O que você aprendeu hoje?"
              ></textarea>
            </div>

            <button type="submit" className="bg-gray-200 px-4 py-2 rounded-md w-full">
              Criar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
