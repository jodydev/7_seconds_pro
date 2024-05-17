import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { JobProvider } from "./context/JobContext";
import "aos/dist/aos.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aos from "aos";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import JobDetails from "./components/Jobs/JobDetails";
import UserDetails from "./components/Users/UserDetails";
import UpgradePlan from "./pages/UpgradePlan";
import supabase from "./supabase/client";

// Context per gestire l'autenticazione
const AuthContext = createContext();

// Hook per accedere al contesto dell'autenticazione
export function useAuth() {
  return useContext(AuthContext);
}

// Provider per gestire lo stato dell'autenticazione
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const refreshUserData = useCallback(async () => {
    if (session) {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [session]);

  useEffect(() => {
    // Ottiene la sessione attuale dell'utente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Registra un ascoltatore per i cambiamenti di autenticazione
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup listener on unmount
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    refreshUserData();
  }, [session, refreshUserData]);

  // Funzione per la registrazione di un nuovo utente
  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  // Funzione per il login di un utente esistente
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  // Funzione per il logout dell'utente attuale
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    session,
    user,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Componente App
export function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { session, user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<LayoutWithRoutes session={session} user={user} />} />
    </Routes>
  );
}

function LayoutWithRoutes({ session, user }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout user={user}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/upgrade-plan" element={<UpgradePlan />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

function Root() {
  return (
    <AppProvider>
      <AuthProvider>
        <JobProvider>
          <Router>
            <App />
          </Router>
        </JobProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default Root;
