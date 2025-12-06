import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";

export default function JoinDrawer({ open, onClose }) {
  const { user } = useAuth();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleJoinGroup(e) {
    e.preventDefault();

    if (!code.trim()) {
      setError("Digite um código de convite.");
      return;
    }

    try {
      const q = query(
        collection(db, "groups"),
        where("inviteCode", "==", code.toUpperCase())
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Código inválido.");
        return;
      }

      const groupDoc = snapshot.docs[0];

      await updateDoc(doc(db, "groups", groupDoc.id), {
        members: arrayUnion(user.uid),
      });

      setSuccess("Você entrou no grupo!");
      setCode("");

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err) {
      setError("Erro ao entrar no grupo: " + err.message);
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
          <h2 className="text-lg font-serif">
            Entrar em um grupo
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <form onSubmit={handleJoinGroup} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-sm font-medium">{success}</p>
            )}

            <div>
              <label className="block text-sm mb-1">
                Código do grupo
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB] focus:outline-none"
                placeholder="ABC123"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-200 px-4 py-2 rounded-md w-full transition"
            >
              Entrar no grupo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
