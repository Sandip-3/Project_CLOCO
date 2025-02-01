import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "./components/ui/sonner";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<UserLogin />} />
        </Route>
      </Routes>
      <Toaster richColors toastOptions={{}} closeButton theme="light" />
    </>
  );
}

export default App;
