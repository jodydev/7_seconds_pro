import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export function useFileCount() {
  const [fileCount, setFileCount] = useState(null);

  //! Funzione per contare i file presenti in tabella "cvs" di Supabase
  const fetchFileCount = async () => {
    try {
      const { data, error } = await supabase.from("cvs").select("*");
      if (error) {
        throw error;
      }
      const allCvs = data.length;
      setFileCount(allCvs);
    } catch (error) {
      console.error("Error fetching file count:", error.message);
    }
  };

  useEffect(() => {
    fetchFileCount();

    const handleChanges = (payload) => {
      console.log("Change received!", payload);
      fetchFileCount();
      setFileCount((prev) => prev + 1);
    };

    const subscription = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cvs",
        },
        handleChanges
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return fileCount;
}
