import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { BsStars } from "react-icons/bs";
import FilterUsersForJob from "../Users/FilterUsersForJob";
import Ai from "../Modal/Ai";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../Loader";
import { getUserData } from "../../hook/getUserData";

export default function JobDetails() {
  const { modalOpen, openModal, closeModal } = useAppContext();
  const { accountCredits } = getUserData();
  const { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [skeletron, setSkeletron] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //! gestione dello stato per lo skeletron dopo l'upload del cv
  const handleUploadCv = (bol) => {
    setSkeletron(bol);
  };

  //! gestione dello stato del messaggio di successo dopo l'upload del cv
  const handleResult = (data) => {
    setMessage(data);
  };

  //! funzione per aggiornare i dati dopo l'upload del cv
  const refreshData = (bol) => {
    setRefresh(bol);
  };

  //! gestione del messaggio di successo dopo l'upload del cv
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  //! funzione per ottenere i dettagli del lavoro selezionato tramite id
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const { data: jobs, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching job details:", error.message);
        } else {
          setSelectedJob(jobs);
        }
      } catch (error) {
        console.error("Error fetching job details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  return (
    <section>
      {modalOpen && (
        <Ai
          onResult={handleResult}
          onUploadCv={handleUploadCv}
          closeModal={closeModal}
          refreshData={refreshData}
        />
      )}
      {loading && <Loader />}

      <div
        data-aos="fade-down"
        className={`${
          modalOpen ? "opacity-10" : "opacity-100 shadow-md"
        } bg-white px-6 py-4 2xl:py-8 2xl:px-10 rounded-2xl mt-5 2xl:mt-10`}
      >
        {selectedJob && (
          <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
            <div className="lg:flex lg:items-center lg:justify-betwee ">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl 2xl:text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
                  {`${selectedJob.role} at ${selectedJob.company_name} [${selectedJob.seniority}]`}
                </h2>
                <div className="my-1 2xl:my-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className=" flex items-center text-sm 2xl:text-base text-gray-500">
                    <CalendarIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    posted{" "}
                    {selectedJob.created_at
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </div>
                </div>
              </div>
              {accountCredits > 0 ? (
                <div className="flex">
                  <button
                    onClick={openModal}
                    type="button"
                    className="inline-flex items-center rounded-2xl bg-indigo-600 px-4 py-3 2xl:px-5  text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <BsStars className="me-2 w-6 h-6" />
                    Upload CVs
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="mt-2 w-full">
                  <span className="text-base 2xl:text-xl font-semibold leading-6 text-gray-900">
                    Job Description:{" "}
                    <p className="text-sm 2xl:text-base font-light my-2 leading-6 text-gray-900 w-1/2">
                      {selectedJob.description}
                    </p>
                  </span>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
      {message && (
        <div
          data-aos="fade-left"
          className="flex items-center p-5 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <FaCheckCircle className="w-5 h-5 me-2" />
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium text-sm 2xl:text-base">
              Upload Successful!
            </span>
          </div>
        </div>
      )}

      <FilterUsersForJob
        refreshData={refreshData}
        refresh={refresh}
        skeletron={skeletron}
      />
    </section>
  );
}
