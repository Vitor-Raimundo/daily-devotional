import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "groups"), {
        name,
        description: desc,
        members: [user.uid],
        createdAt: Timestamp.now(),
        createBy: user.uid,
      });

      nav(`/group/${docRef.id}`);
    } catch (err) {
      alert("Erro ao criar grupo: " + err.message);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Group</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Group Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          className="px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}
