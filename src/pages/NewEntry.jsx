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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nova Leitura</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Trecho lido (ex: Marcos 1:1-5)"
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="O que aprendi"
          value={learned}
          onChange={(e) => setLearned(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="O que não entendi"
          value={notUnderstood}
          onChange={(e) => setNotUnderstood(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="O que pretendo ler amanhã"
          value={tomorrow}
          onChange={(e) => setTomorrow(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Salvar leitura
        </button>
      </form>
    </div>
  );
}
