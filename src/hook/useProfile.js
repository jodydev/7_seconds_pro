import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import AppContext from "../context/AppContext";

function useProfile() {
  const { session } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("users")
        .select(`*`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.error(error);
        } else if (data) {
          setProfile(data); 
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  return {
    profile, 
    loading,
  };
}

export default useProfile;
