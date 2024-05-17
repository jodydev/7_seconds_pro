import { useState, useEffect } from "react";
import supabase from "../supabase/client";

// Hook per la gestione dell'autenticazione
function useAuth() {
  // Stato per memorizzare i dati della sessione
  const [session, setSession] = useState(false);

  // Funzione per la registrazione di un nuovo utente
  const signUp = async (email, password) => {
    await supabase.auth.signUp(email, password);
    setSession(true);
  };

  // Funzione per il login di un utente esistente
  const signIn = async (email, password) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSession(true);
  };

  // Funzione per il logout dell'utente attuale
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(false);
  };

  // Effetto per ottenere la sessione dell'utente e registrare un ascoltatore per i cambiamenti di autenticazione
  useEffect(() => {
    // Ottiene la sessione attuale dell'utente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Registra un ascoltatore per i cambiamenti di autenticazione
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return {
    session,
    signIn,
    signUp,
    signOut,
  };
}

export default useAuth;
