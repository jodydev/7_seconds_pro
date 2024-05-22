import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import supabase from "../supabase/client";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
  
    getSession();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );
  
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  

  useEffect(() => {
    refreshUserData();
  }, [session, refreshUserData]);

  const value = {
    session,
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
