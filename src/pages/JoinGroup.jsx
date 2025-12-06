import React, { useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function JoinGroup() {
  const [groupId, setGroupId] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();

  async function handleJoin(e) {
    e.preventDefault();

    const ref = doc(db, "groups", groupId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Grupo não encontrado!");
      return;
    }

    await updateDoc(ref, {
      members: arrayUnion(user.uid),
    });

    nav(`/group/${groupId}`);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Join Group</h1>

      <form onSubmit={handleJoin} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-green-600 text-white
         rounded"
        >
          Join
        </button>
      </form>
    </div>
  );
}
