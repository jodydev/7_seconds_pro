import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase/client";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [fileCount, setFileCount] = useState(null);
  const [loading, setLoading] = useState(true);

  //! Funzione per caricare i jobs
  const getJobs = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) throw error;
      else {
        setJobs(data || []);
        setTotalJobs(data.length);
      }
    } catch (error) {
      console.error("Errore durante il caricamento dei jobs:", error.message);
    }
  };

  //! Funzione per ottenere il numero di file dallo storage
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

  //! Funzione per ottenere i jobs con il numero di cv associati
  const getFilterJobs = async () => {
    setLoading(true);
    try {
      const { data: jobsData, error: jobsError } = await supabase
        .from("jobs")
        .select("*");
      if (jobsError) {
        throw jobsError;
      }

      const jobsWithCvsCount = await Promise.all(
        jobsData.map(async (job) => {
          const { count, error } = await supabase
            .from("threads")
            .select("*", { count: "exact" })
            .eq("jobid", job.id);
          if (error) {
            throw error;
          }
          return { ...job, cvsCount: count };
        })
      );

      setFilterJobs(jobsWithCvsCount);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getJobs();
    fetchFileCount();
    getFilterJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, totalJobs, filterJobs, fileCount, loading, }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
