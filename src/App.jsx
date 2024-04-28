import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import "aos/dist/aos.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aos from "aos";
import supabase from "./supabase/client";
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
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/*"
        element={<LayoutWithRoutes />}
      />
    </Routes>
  );
}

function LayoutWithRoutes() {
  const userData = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}


function Root() {
  const userData = useAuth();

  const [session, setSession] = useState(null);

  // Effetto per ottenere e impostare la sessione corrente
  useEffect(() => {
    // Ottiene la sessione corrente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Ascolta i cambiamenti di autenticazione
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Restituisce la struttura dell'applicazione
  return (
    <AppProvider value={{ session, setSession, userData }}>
      <Router>
        <App /> 
      </Router>
    </AppProvider>
  );
}

export default Root;
