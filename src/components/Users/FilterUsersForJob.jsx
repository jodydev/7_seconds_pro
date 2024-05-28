import { BsStars } from "react-icons/bs";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppContext } from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getUserData } from "../../hook/getUserData";
import StarRatings from "react-star-ratings";
import supabase from "../../supabase/client";
import ReadySpan from "../ReadySpan";
import ProcessingSpan from "../ProcessingSpan";
import ErrorSpan from "../ErrorSpan";
import extractFileName from "../../hook/extractFileName";
import usePagination from "../../hook/usePagination";
import useSorting from "../../hook/useSorting";
import ApplicantsPagination from "../ApplicantsPagination";

export default function FilterUsersForJob({ refresh }) {
  const { t } = useTranslation();
  const jobId = useParams().id;
  const { accountCredits } = getUserData();
  const applicantsCountRef = useRef(0);
  const { modalOpen, openModal, checkDeviceSizeApplicantsTable } =
    useAppContext();
  const [applicants, setApplicants] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    currentItemsSlice,
  } = usePagination(totalApplicants, checkDeviceSizeApplicantsTable);
  const { sortDirection: sortDirectionC, handleSort: handleSortByCreatedAt } =
    useSorting();
  const { sortDirection: sortDirectionR, handleSort: handleSortByRating } =
    useSorting();
  const currentApplicants = currentItemsSlice(applicants);

  //! Funzione per cambiare il numero di candidati per pagina
  const handleApplicantsPerPageChange = (event) => {
    handleItemsPerPageChange(parseInt(event.target.value));
  };

  //! Funzione per aggiornare il numero totale di candidati ogni volta che ne viene aggiunto uno in tempo reale
  useEffect(() => {
    applicantsCountRef.current = applicants.length;
    setTotalApplicants(applicantsCountRef.current);
  }, [applicants]);

  //! Funzione per ordinare i candidati per data di creazione al caricamento iniziale della pagina
  useEffect(() => {
    setApplicants((prevApplicants) =>
      prevApplicants.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    );
  }, [applicants]);

  //! Funzione per gestire i cambiamenti nel database e aggiungere i nuovi candidati in tempo reale
  useEffect(() => {
    const getApplicantsForJob = async (jobId) => {
      try {
        const { data, error } = await supabase
          .from("cvs_data")
          .select("*")
          .eq("jobid", jobId);

        if (error) {
          throw error;
        } else {
          setApplicants(data);
          setTotalApplicants(data.length);
        }
      } catch (error) {
        console.error("Errore durante il caricamento dei jobs:", error.message);
      }
    };

    const handleChanges = (payload) => {
      if (payload.eventType === "INSERT" && payload.table === "threads") {
        setApplicants((prevApplicants) => [payload.new, ...prevApplicants]);
        setTotalApplicants((prevTotal) => prevTotal + 1);
      }
    };

    const intervalId = setInterval(() => {
      getApplicantsForJob(jobId);
    }, 10000);

    supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          view: "cvs_data",
        },
        handleChanges
      )
      .subscribe();

    getApplicantsForJob(jobId);
    return () => clearInterval(intervalId);
  }, [jobId]);

  return (
    <section data-aos="fade-up">
      <div
        className={`${
          modalOpen ? "opacity-10" : "opacity-100"
        } bg-white px-6 py-6 shadow-lg rounded-2xl mt-4 sm:mt-8 2xl:mt-10 `}
      >
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
          <div className="ml-0 2xl:ml-4 mb-4 2xl:mb-6">
            <h3 className="text-2xl 2xl:text-4xl font-bold leading-6 text-gray-900">
              {t("Applicants")}
            </h3>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-4 2xl:mt-6">
          {totalApplicants === 0 && refresh === false ? (
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="2xl:text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="2xl:text-xl">
                  <th scope="col" className="px-3 py-3 ">
                    {t("Status")}
                  </th>
                  <th scope="col" className="px-3 py-3 ">
                    {t("Candidate")}
                  </th>
                  <th scope="col" className="px-3 py-3">
                    {t("Created at")}
                  </th>
                  <th scope="col" className="px-3 py-3">
                    {t("Age")}
                  </th>
                  <th scope="col" className="px-3 py-3">
                    {t("City")}
                  </th>
                  <th scope="col" className="px-3 py-3">
                    {t("AI Score")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white h-[380px] 2xl:h-[700px] border-b dark:bg-gray-800 dark:border-gray-700">
                  {accountCredits > 0 ? (
                    <td className="text-center py-6 px-32 sm:px-0" colSpan="8">
                      <p className="text-sm sm:text-2xl 2xl:text-5xl  font-semibold">
                        {t("No applications for this job yet...")}
                      </p>
                      <p className="text-sm sm:text-xl  2xl:text-4xl  font-semibold my-0 sm:my-3">
                        {t("Upload your first")}
                        <span className="text-indigo-500 ms-2">{t("CV!")}</span>
                      </p>
                      <div className="flex items-center justify-center mt-5 sm:mt-20">
                        <button
                          onClick={openModal}
                          type="button"
                          className="inline-flex items-center rounded-2xl bg-indigo-600 px-2 py-2 md:px-4 md:py-3 2xl:px-5 text-base 2xl:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <span>
                            <BsStars className="me-0 md:me-2 md:w-6 md:h-6" />
                          </span>
                          <span className="hidden md:block">
                            {t("Upload CVs")}
                          </span>
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td className="text-center py-6" colSpan="8">
                      <p className="text-2xl 2xl:text-5xl  font-semibold">
                        {t("No applications for this job yet...")}
                      </p>
                      <p className="text-xl 2xl:text-4xl  font-semibold my-3">
                        {t(
                          "Top up your credits to continue with the features."
                        )}
                      </p>
                      <a
                        href="/upgrade-plan"
                        type="button"
                        className="mt-10 inline-flex items-center rounded-2xl bg-indigo-600 px-4 py-3 2xl:px-6 2xl:py-4 text-base 2xl:text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <BsStars className="me-2 w-6 h-6 2xl:w-8 2xl:h-8" />
                        {t("Upgrade Plan")}
                      </a>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className=" text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-sm md:text-base 2xl:text-xl">
                  <th scope="col" className="px-2 md:px-3 md:py-3 ">
                    {t("Status")}
                  </th>
                  <th scope="col" className="px-2 md:px-3 md:py-3 ">
                    {t("Candidate")}
                  </th>
                  <th scope="col" className="px-2 md:px-3 md:py-3">
                    <button
                      onClick={handleSortByCreatedAt}
                      className="flex items-center focus:outline-none hover:cursor-pointer"
                    >
                      {t("Created at")}
                      {sortDirectionC === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4 ml-1 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-2 md:px-3 md:py-3">
                    {t("Age")}
                  </th>
                  <th scope="col" className="px-2 md:px-3 md:py-3">
                    {t("City")}
                  </th>
                  <th scope="col" className="px-2 md:px-3 md:py-3">
                    {t("AI Score")}
                    <button
                      onClick={handleSortByRating}
                      className="flex-row items-center focus:outline-none hover:cursor-pointer"
                    >
                      {sortDirectionR === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4 ml-1 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="hover:cursor-pointer ">
                {currentApplicants.map((applicant) => (
                  <tr
                    key={applicant.thread_id}
                    className="text-sm 2xl:text-lg bg-white border-b"
                  >
                    <td className="px-3 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.status === "new" ||
                          applicant.status === "queued" ||
                          applicant.thread_status === "new" ? (
                            <ProcessingSpan />
                          ) : applicant.thread_status === "failed" ? (
                            <ErrorSpan />
                          ) : (
                            <ReadySpan />
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full truncate">
                          {applicant.fullname ||
                            extractFileName(applicant.file) || (
                              <div className="animate-pulse  h-6 bg-gray-200 rounded-lg"></div>
                            )}
                        </div>
                      </Link>
                    </td>
                    <td
                      className="px-3 py-4"
                      title={
                        applicant.cv_created_at
                          ? new Date(applicant.cv_created_at).toLocaleString()
                          : ""
                      }
                    >
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.cv_created_at ? (
                            new Date(
                              applicant.cv_created_at
                            ).toLocaleDateString()
                          ) : (
                            <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                          )}
                        </div>
                      </Link>
                    </td>

                    <td className="px-3 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.age === null ||
                          applicant.age === undefined ? (
                            <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                          ) : applicant.age === 0 ? (
                            <span>N/D</span>
                          ) : (
                            <span>{applicant.age}</span>
                          )}
                        </div>
                      </Link>
                    </td>

                    <td className="px-3 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.city === null ||
                          applicant.city === undefined ? (
                            <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                          ) : applicant.city === 0 ? (
                            <span>N/D</span>
                          ) : (
                            <span>{applicant.city}</span>
                          )}
                        </div>
                      </Link>
                    </td>

                    <td className="px-3 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.rating === null ||
                          applicant.rating === undefined ? (
                            <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                          ) : (
                            <div className="flex flex-row  flex-nowrap">
                              <StarRatings
                                rating={applicant.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                              />
                              <p className="ms-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs 2xl:text-sm font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                {`${
                                  applicant.rating === 0
                                    ? "0"
                                    : applicant.rating
                                }`}
                              </p>
                            </div>
                          )}
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <ApplicantsPagination
            totalItems={totalApplicants}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleItemsPerPageChange={handleApplicantsPerPageChange}
            itemsPerPageOptions={[checkDeviceSizeApplicantsTable, 25, 50, 100]}
            currentItemsLength={currentApplicants.length}
            t={t}
            checkDeviceSizeApplicantsTable={checkDeviceSizeApplicantsTable}
          />
        </div>
      </div>
    </section>
  );
}
