import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Jobs from "../pages/Jobs";
import Documents from "../pages/Documents";
import Ai from "../pages/Ai";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/ai" element={<Ai />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
