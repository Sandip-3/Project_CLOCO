import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "./components/ui/sonner";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";
import ProtectedRoute from "./components/Protected";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import ProtectedAdminRoute from "./components/AdminProtected/AdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route index element={<Register />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Protected User Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Protected Admin Dashboard */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors toastOptions={{}} closeButton theme="light" />
      
    </>
  );
}

export default App;
