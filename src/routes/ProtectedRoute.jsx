// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../services/firebase";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   if (!user) return <Navigate to="/login" />;

//   return children;
// }
