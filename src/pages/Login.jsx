import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      navigate("/");
    } catch (err) {
      setError("Email ou senha incorretos: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5EF] px-4">
      {/* Ícone + título global */}
      <div className="mb-8 text-center opacity-0 animate-fadeIn">
        <div className="text-5xl mb-2">📖</div>
        <h1 className="text-3xl font-serif text-[#3A5A40]">
          Leitura Devocional
        </h1>
      </div>

      {/* CARD */}
      <div className="w-full max-w-88 bg-white p-8 rounded-2xl shadow-md border border-[#E6E4DE] opacity-0 animate-fadeIn">
        <h2 className="text-xl font-serif text-[#3A5A40] text-center mb-6">
          Entrar
        </h2>

        {/* ERRO */}
        {error && (
          <p className="-my-5 text-center text-red-500 text-sm mb-0 z-50">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <div className="mb-4">
            {" "}
            {/* Adiciona margem abaixo do campo */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg 
              placeholder-gray-400
              focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] outline-none transition"
            />
          </div>

          {/* SENHA */}
          <div className="mb-4">
            {/* Adiciona margem abaixo do campo */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg 
              placeholder-gray-400
              focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] outline-none transition"
              />
              {/* Ícone para mostrar/ocultar a senha */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Alterna o estado
                className="absolute cursor-pointer top-5 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <span role="img" aria-label="Ocultar senha">
                    🙈
                  </span> // Ícone para ocultar
                ) : (
                  <span role="img" aria-label="Mostrar senha">
                    👁️
                  </span> // Ícone para mostrar
                )}
              </button>
            </div>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#3A5A40] text-white py-2 rounded-xl font-medium hover:bg-[#2F4A33] transition"
          >
            Entrar
          </button>
        </form>

        {/* LINK */}
        <p className="text-center text-sm text-gray-700 mt-5">
          Não tem conta?{" "}
          <Link
            to="/register"
            className="text-[#3A5A40] font-medium hover:underline"
          >
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
}
