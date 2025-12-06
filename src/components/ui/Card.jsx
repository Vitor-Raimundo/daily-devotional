export default function Card({ children }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      {children}
    </div>
  );
}
