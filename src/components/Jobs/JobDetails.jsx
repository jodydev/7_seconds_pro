import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { BsStars } from "react-icons/bs";
import { getUserData } from "../../hook/getUserData";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoArrowUndo } from "react-icons/io5";
import supabase from "../../supabase/client";
import Loader from "../Loader";
import FilterUsersForJob from "../Users/FilterUsersForJob";
import Ai from "../Modal/Ai";

export default function JobDetails() {
  const { t } = useTranslation();
  const { modalOpen, openModal, closeModal } = useAppContext();
  const { accountCredits } = getUserData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [skeletron, setSkeletron] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentLengthThreshold = 100;

  //! funzione per espandere la sezione della job description
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

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

  //! Funzione per ottenere i candidati per il lavoro selezionato
  useEffect(() => {
    const getApplicantsForJob = async () => {
      try {
        const { data, error } = await supabase
          .from("cvs_data")
          .select("*")
          .eq("jobid", id);

        if (error) {
          console.log(error);
        } else {
          setApplicants(data);
        }
      } catch (error) {
        console.error("Errore durante il caricamento dei jobs:", error.message);
      } finally {
      }
    };

    getApplicantsForJob(id);
  }, [id]);

  const handleMouseEnter = (event) => {
    const tooltip = event.target.nextElementSibling;
    tooltip.style.display = "block";
  };

  const handleMouseLeave = (event) => {
    const tooltip = event.target.nextElementSibling;
    tooltip.style.display = "none";
  };

  const goBack = () => {
    navigate(-1);
  };

  const style = {
    ol: {
      paddingLeft: 0,
      listStyle: "none",
    },
    li: {
      marginLeft: "1.5em",
      position: "relative",
    },
    "li::before": {
      content: "'\\2022'",
      position: "absolute",
      left: "-1.5em",
    },
  };

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
        } bg-white px-6 py-4 2xl:py-8 2xl:px-10 rounded-2xl`}
      >
        {selectedJob && (
          <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
            <div className="absolute left-[-10px] md:left-[-20px] 2xl:left-[-25px] 2xl:top-[-30px] top-[-10px] rounded-full">
              <button
                onClick={goBack}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
              >
                <IoArrowUndo className="2xl:w-6 2xl:h-6 w-4 h-4" />
              </button>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1 relative">
                <h2
                  className="text-xl 2xl:text-4xl font-bold leading-7 text-gray-900 truncate tracking-tight cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {`${selectedJob.role} @ ${selectedJob.company_name} [${selectedJob.seniority}]`}
                </h2>
                <div className="absolute top-[-50px] left-0 bg-indigo-500 text-white shadow-md px-4 py-2 text-xs 2xl:text-base rounded-md hidden">
                  {`${selectedJob.role} @ ${selectedJob.company_name} [${selectedJob.seniority}]`}
                </div>

                <div className="my-1 2xl:my-3 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="flex items-center text-sm 2xl:text-base text-gray-500">
                    <CalendarIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {t("posted on")}{" "}
                    {selectedJob.created_at
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </div>
                </div>
              </div>
              {accountCredits > 0 && applicants.length >= 1 ? (
                <div className="relative md:static md:flex">
                  <button
                    onClick={openModal}
                    type="button"
                    className="absolute md:relative right-0 bottom-[-25px] sm:bottom-0 inline-flex items-center rounded-2xl bg-indigo-600 px-2 py-2 md:px-4 2xl:py-3 2xl:px-5 text-base 2xl:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <span>
                      <BsStars className="me-0 md:me-2 md:w-5 md:h-5" />
                    </span>
                    <span className="hidden md:block">{t("Upload CVs")}</span>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mt-3 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="mt-2 w-full">
                  <span className="text-base 2xl:text-2xl font-semibold leading-6 text-gray-900 ">
                    {t("Job Description:")}
                    <div
                      className={`text-sm 2xl:text-base font-light mt-2 2xl:leading-8 text-gray-900 w-full italic ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          `<style>${style}</style>` + selectedJob.description,
                      }}
                    ></div>
                    {selectedJob.description.length >
                      contentLengthThreshold && (
                      <div className="flex items-center justify-center">
                        <button
                          onClick={toggleExpansion}
                          className="text-blue-500 text-xs hover:underline mt-3 "
                        >
                          {isExpanded ? t("Read less") : t("Read more")}
                        </button>
                      </div>
                    )}
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
          className="flex items-center p-5 mt-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400"
          role="alert"
        >
          <FaCheckCircle className="w-5 h-5 me-2" />
          <span className="sr-only"> {t("Info")}</span>
          <div>
            <span className="font-medium text-sm 2xl:text-base">
              {t("Upload Successful!")}
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
