import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { JobProvider } from "./context/JobContext";
import "aos/dist/aos.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aos from "aos";
import useAuth from "./hook/useAuth";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import JobDetails from "./components/Jobs/JobDetails";
import UserDetails from "./components/Users/UserDetails";

export function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<LayoutWithRoutes />} />
    </Routes>
  );
}

function LayoutWithRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

function Root() {
  const { session } = useAuth();

  return (
    <AppProvider value={{ session }}>
      <JobProvider>
        <Router>
          <App />
        </Router>
      </JobProvider>
    </AppProvider>
  );
}

export default Root;
