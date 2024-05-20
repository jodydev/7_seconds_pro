import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export function useFileCount() {
  const [fileCount, setFileCount] = useState(null);

  useEffect(() => {
    const fetchFileCount = async () => {
      try {
        const { data, error } = await supabase.storage.from("cvfiles").list();
        if (error) {
          throw error;
        }
        const count = data ? data.length : 0;
        setFileCount(count);
      } catch (error) {
        console.error("Error fetching file count:", error.message);
      }
    };
    fetchFileCount();
  }, []);

  return fileCount;
}
