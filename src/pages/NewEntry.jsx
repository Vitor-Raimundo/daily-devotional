import React, { useState } from "react";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function NewEntry() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const [passage, setPassage] = useState("");
  const [learned, setLearned] = useState("");
  const [notUnderstood, setNotUnderstood] = useState("");
  const [tomorrow, setTomorrow] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "groups", id, "entries"), {
        passage,
        learned,
        notUnderstood,
        tomorrow,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        createdAt: Timestamp.now(),
      });

      nav(`/group/${id}`);
    } catch (err) {
      alert("Erro ao registrar leitura: " + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-4 py-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-[#E6E4DE]">
        {/* Título */}
        <h1 className="text-2xl font-serif text-[#3A5A40] mb-6 text-center">
          Nova Leitura 📖
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Trecho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trecho lido
            </label>
            <input
              type="text"
              placeholder="Ex: Marcos 1:1–5"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg
              placeholder-gray-400
              focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40]
              outline-none transition"
            />
          </div>

          {/* Aprendizado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              O que aprendi
            </label>
            <textarea
              rows="3"
              placeholder="Escreva aqui seu aprendizado..."
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg
              placeholder-gray-400 resize-none
              focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40]
              outline-none transition"
            />
          </div>

          {/* Dúvidas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              O que não entendi
            </label>
            <textarea
              rows="3"
              placeholder="Anote suas dúvidas..."
              value={notUnderstood}
              onChange={(e) => setNotUnderstood(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg
              placeholder-gray-400 resize-none
              focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40]
              outline-none transition"
            />
          </div>

          {/* Amanhã */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              O que pretendo ler amanhã
            </label>
            <textarea
              rows="2"
              placeholder="Próximo trecho..."
              value={tomorrow}
              onChange={(e) => setTomorrow(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg
              placeholder-gray-400 resize-none
              focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40]
              outline-none transition"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-[#3A5A40] text-white py-2 rounded-xl
            font-medium hover:bg-[#2F4A33] transition"
          >
            Salvar leitura
          </button>
        </form>
      </div>
    </div>
  );
}
