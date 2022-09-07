import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Accounts from "./pages/accounts";
import LoginPage from "./pages/Login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/SignIn" />} />
      <Route path="/SignIn" element={<LoginPage />} />
      <Route path="/SignUp" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
    </Routes>
  );
}

export default App;
