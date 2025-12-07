// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//   const { register } = useAuth();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       if (!name.trim()) {
//         setError("Por favor, digite seu nome.");
//         return;
//       }

//       await register(name, email, password);
//     } catch (err) {
//       setError("Erro ao criar conta. Verifique os dados: " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5EF] px-4">
//       {/* Ícone + título global */}
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-[#E6E4DE] opacity-0 animate-fadeIn">
//         <h2 className="text-xl font-serif text-[#3A5A40] text-center mb-6">
//           Criar conta
//         </h2>

//         {error && (
//           <p className="-my-5 text-center text-red-500 text-sm mb-0 z-50">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleRegister} className="space-y-6">
//           {/* Nome */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Nome
//             </label>
//             <input
//               type="text"
//               placeholder="Seu nome completo"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border border-gray-300 px-3 py-2 rounded-lg
//               placeholder-gray-400
//               focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] outline-none transition"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="exemplo@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 px-3 py-2 rounded-lg
//               placeholder-gray-400
//               focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] outline-none transition"
//             />
//           </div>

//           {/* Senha */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Senha
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-gray-300 px-3 py-2 rounded-lg
//               placeholder-gray-400
//               focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] outline-none transition"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)} // Alterna o estado
//                 className="absolute cursor-pointer top-5 right-3 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? (
//                   <span role="img" aria-label="Ocultar senha">
//                     🙈
//                   </span> // Ícone para ocultar
//                 ) : (
//                   <span role="img" aria-label="Mostrar senha">
//                     👁️
//                   </span> // Ícone para mostrar
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Botão */}
//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-[#3A5A40] text-white py-2 rounded-xl font-medium hover:bg-[#2F4A33] transition"
//           >
//             Registrar
//           </button>
//         </form>

//         {/* Link para login */}
//         <p className="text-center text-sm text-gray-700 mt-5">
//           Já tem conta?{" "}
//           <Link
//             to="/login"
//             className="text-[#3A5A40] font-medium hover:underline"
//           >
//             Entrar
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Acessando o contexto de autenticação

export default function Register() {
  const { register } = useAuth(); // Pegando a função de registro do contexto
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Verifica se o nome foi inserido
      if (!name.trim()) {
        setError("Por favor, digite seu nome.");
        return;
      }

      // Chama a função de registro do contexto
      await register(name, email, password);
      console.log("Conta criada com sucesso!");
    } catch (err) {
      // Exibe o erro caso haja algum
      setError("Erro ao criar conta. Verifique os dados: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Ícone + título global */}
      <div className="w-full max-w-md bg-white p-8">
        <h2 className="text-xl font-serif text-center mb-6">Criar conta</h2>

        {error && (
          <p className="-my-5 text-center text-red-500 text-sm mb-0 z-50">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg placeholder-gray-400 focus:ring-2 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg placeholder-gray-400 focus:ring-2 "
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] outline-none transition"
              />
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

          {/* Botão */}
          <button
            type="submit"
            className="w-full cursor-pointer text-black py-2 rounded-xl font-medium bg-gray-200"
          >
            Registrar
          </button>
        </form>

        {/* Link para login */}
        <p className="text-center text-sm text-gray-700 mt-5">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
