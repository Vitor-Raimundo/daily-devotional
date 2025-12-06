import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import CreateGroup from "../pages/CreateGroup";
import JoinGroup from "../pages/JoinGroup";
import GroupPage from "../pages/GroupPage";
import NewEntry from "../pages/NewEntry";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-group"
            element={
              <PrivateRoute>
                <CreateGroup />
              </PrivateRoute>
            }
          />

          <Route
            path="/join-group"
            element={
              <PrivateRoute>
                <JoinGroup />
              </PrivateRoute>
            }
          />

          <Route
            path="/group/:id"
            element={
              <PrivateRoute>
                <GroupPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/group/:id/new-entry"
            element={
              <PrivateRoute>
                <NewEntry />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
