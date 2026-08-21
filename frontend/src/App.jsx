import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/splash";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";

import ProtectedRoute from "./components/protectedroute";
import CreateWizard from "./pages/Createwizard";
import CollectionViewer from "./pages/CollectionViewer";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreateWizard />
    </ProtectedRoute>
  }
/>
<Route
  path="/collection/:id"
  element={
    <ProtectedRoute>
      <CollectionViewer />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Navigate to="/splash" replace />} />

        <Route path="/splash" element={<Splash />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}