import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
