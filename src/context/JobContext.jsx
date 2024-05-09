import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase/client";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [cvsForJob, setCvsForJob] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [fileCount, setFileCount] = useState(null);
  const [loading, setLoading] = useState(true);

  //! Funzione per prendere i jobs
  const getJobs = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) {
        throw error;
      } else {
        setJobs(data || []);
        setTotalJobs(data.length);
      }
    } catch (error) {
      console.error("Errore durante il caricamento dei jobs:", error.message);
    }
  };

  //! Funzione per ottenere i jobs con il numero di cv associati
  const getFilterJobs = async () => {
    setLoading(true);
    try {
      const { data: initialJobsData, error: jobsError } = await supabase
        .from("jobs")
        .select("*");
      if (jobsError) {
        throw jobsError;
      }

      const jobsWithCvsCount = await Promise.all(
        initialJobsData.map(async (job) => {
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
      setCvsForJob(jobsWithCvsCount);

      // Definisci una funzione per gestire gli inserimenti
      const handleChanges = (payload) => {
        if (payload.eventType === "INSERT") {
          setTotalJobs((prevTotal) => prevTotal + 1);
          setCvsForJob((prevJobs) => [
            ...prevJobs,
            { ...payload.new, cvsCount: 0 },
          ]);
        } else if (payload.eventType === "UPDATE") {
          setCvsForJob((prevJobs) =>
            prevJobs.map((job) =>
              job.id === payload.new.id ? { ...job, ...payload.new } : job
            )
          );
        } else if (payload.eventType === "DELETE") {
          setCvsForJob((prevJobs) =>
            prevJobs.filter((job) => job.id !== payload.old.id)
          );
        }
      };

      // Ascolta tutti gli eventi di cambiamento sulla tabella "jobs"
      supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "jobs",
          },
          handleChanges
        )
        .subscribe();
    } catch (error) {
      console.error("Errore nel recupero dei lavori:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilterJobs();
  }, []);

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



  useEffect(() => {
    getJobs();
    getFilterJobs();
    fetchFileCount();
  }, []);

  return (
    <JobContext.Provider
      value={{ jobs, totalJobs, cvsForJob, fileCount, loading }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
