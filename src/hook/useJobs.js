import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export function useJobs() {
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const { data, error } = await supabase.from("jobs").select("*");
        if (error) {
          throw error;
        } else {
          setTotalJobs(data.length);
        }
      } catch (error) {
        console.error("Errore durante il caricamento dei jobs:", error.message);
      }
    };
    getJobs();
  }, []);

  return totalJobs;
}
