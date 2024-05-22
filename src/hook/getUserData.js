import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export function getUserData() {
  const [userEmail, setUserEmail] = useState("");
  const [accountCredits, setAccountCredits] = useState(0);
  const [subscription, setSubscription] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        setUserEmail(user.email);
        getAccountCredits(user.id);
      } catch (error) {
        console.error(
          "Errore durante il recupero dell'ID dell'utente:",
          error.message
        );
      }
    };

    const getAccountCredits = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("accounts")
          .select("*")
          .eq("userid", userId);

        if (error) {
          console.error(
            "Errore durante il caricamento dei crediti dell'account:",
            error.message
          );
        } else {
          setAccountCredits(data[0].credits_remaining);
          setSubscription(data[0].subscription_plan);
        }
      } catch (error) {
        console.error(
          "Errore durante il caricamento dei crediti dell'account:",
          error.message
        );
      }
    };

    fetchUserData();
  }, []);

  return { userEmail, accountCredits, subscription };
}
