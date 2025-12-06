import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  // Controle do Drawer
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#3D3D3D] relative">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-serif">
          Leitura Devocional 🙏
        </h1>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => setOpenCreateDrawer(true)}
            className="text-sm hover:underline"
          >
            Criar grupo
          </button>

          <Link
            to="/join-group"
            className="text-sm hover:underline"
          >
            Entrar em grupo
          </Link>

          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Sair
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Saudação */}
        <h2 className="text-2xl font-serif mb-6">
          Bem-vindo, {user?.name || user?.displayName || user?.email} 🌿
        </h2>

        {/* Devocional do Dia */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6E4DE]">
            <h3 className="text-xl font-serif mb-2">
              Devocional do Dia
            </h3>

            <p className="text-sm text-[#3D3D3D]/80 mb-4 leading-relaxed">
              “Porque Deus amou o mundo de tal maneira que deu o seu Filho
              unigênito, para que todo aquele que nele crê não pereça, mas tenha
              a vida eterna.”
              <br />
              <span className="text-xs opacity-70">— João 3:16</span>
            </p>

            <Link
              to="/reading/today"
              className="inline-block mt-2 px-5 py-2 bg-[#3A5A40] text-white rounded-xl font-medium hover:bg-[#2F4A33] transition"
            >
              Ler agora →
            </Link>
          </div>
        </section>

        {/* Meus grupos */}
        <section>
          <h3 className="text-xl font-serif mb-3">
            Meus grupos
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-[#E6E4DE] shadow-sm flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">
                  Marcos apenas
                </p>
                <p className="text-sm text-[#3D3D3D]/70">
                  Leitura do livro de Marcos
                </p>
              </div>

              <Link
                to="/groups/example"
                className="text-[#3A5A40] font-medium hover:underline"
              >
                Abrir →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===========================
            OVERLAY Dark Background
         =========================== */}
      {openCreateDrawer && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpenCreateDrawer(false)}
        ></div>
      )}

      {/* ===========================
            DRAWER LATERAL (Criar Grupo)
         =========================== */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-white z-50 shadow-xl
          w-[35%] max-w-[450px]
          transform transition-transform duration-300
          ${openCreateDrawer ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Cabeçalho do Drawer */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-serif">
            Criar novo grupo
          </h2>

          <button
            onClick={() => setOpenCreateDrawer(false)}
            className="text-2xl hover:text-[#2F4A33]"
          >
            ×
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5">
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Nome do grupo
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB] focus:outline-none"
                placeholder="Ex: Leitura do Evangelho"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Descrição
              </label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border rounded-md border-[#D3D1CB] focus:outline-none"
                placeholder="Detalhes do grupo..."
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-[#3A5A40] text-white px-4 py-2 rounded-md w-full hover:bg-[#2F4A33] transition"
            >
              Criar grupo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
