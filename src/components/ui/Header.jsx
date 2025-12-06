import { useNavigate } from "react-router-dom";

export default function Header({ title, back = false }) {
  const nav = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-6">
      {back && (
        <button
          onClick={() => nav(-1)}
          className="text-gray-500 hover:text-gray-800 text-xl"
        >
          ←
        </button>
      )}

      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </h1>
    </div>
  );
}
