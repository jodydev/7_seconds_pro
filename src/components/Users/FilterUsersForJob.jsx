import { PiStarFill } from "react-icons/pi";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import Loader from "../Loader";

export default function FilterUsersForJob({ skeletron }) {
  const jobId = useParams().id;
  const applicantsCountRef = useRef(0);
  const { modalOpen, checkDeviceSizeApplicantsTable } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [sortDirectionR, setSortDirectionR] = useState("desc");
  const [sortDirectionC, setSortDirectionC] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage, setApplicantsPerPage] = useState(
    checkDeviceSizeApplicantsTable
  );
  const [showAllApplicants, setShowAllApplicants] = useState(false);
  const totalPages = Math.ceil(totalApplicants / applicantsPerPage);
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = showAllApplicants
    ? applicants
    : applicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

  //! Funzione per cambiare la pagina
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //! Funzione per cambiare il numero di candidati per pagina
  const handleApplicantsPerPageChange = (event) => {
    setApplicantsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  //! Funzione per ordinare i candidati per data di creazione
  const handleSortByCreatedAt = () => {
    setSortDirectionC((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );

    setApplicants((prevApplicants) =>
      prevApplicants.slice().sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortDirectionC === "asc" ? dateA - dateB : dateB - dateA;
      })
    );
  };

  //! Funzione per ordinare i candidati per rating
  const handleSortByRating = () => {
    setSortDirectionR((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );

    setApplicants((prevApplicants) =>
      prevApplicants.slice().sort((a, b) => {
        const ratingA = a.rating;
        const ratingB = b.rating;
        return sortDirectionR === "asc" ? ratingA - ratingB : ratingB - ratingA;
      })
    );
  };

  //! Funzione per prendere i candidati per un job specifico
  useEffect(() => {
    const getApplicantsForJob = async (jobId) => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("cvs_data")
          .select("*")
          .eq("jobid", jobId);

        if (error) {
          throw error;
        }

        setApplicants(data);
      } catch (error) {
        console.error("Errore durante il caricamento dei jobs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getApplicantsForJob(jobId);
  }, [jobId]);

  //! Funzione per gestire i cambiamenti nel database e aggiungere i nuovi candidati in tempo reale
  useEffect(() => {
    const handleChanges = (payload) => {
      if (payload.table === "table") {
        setApplicants((prevApplicants) => [...prevApplicants, payload.new]);
        setTotalApplicants(applicants.lenght + 1);
      }
    };

    const changeSubscription = supabase
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

    return () => {
      changeSubscription.unsubscribe();
    };
  }, []);

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

  return (
    <section data-aos="fade-up">
      {loading && <Loader />}
      <div
        className={`${
          modalOpen ? "opacity-10" : "opacity-100"
        } bg-white px-6 py-6 shadow-lg rounded-2xl mt-5`}
      >
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
          <div className="ml-0 2xl:ml-4 mb-4">
            <h3 className="text-2xl 2xl:text-4xl font-bold leading-6 text-gray-900">
              Applicants
            </h3>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
          {totalApplicants === 0 ? (
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="2xl:text-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created at
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Ai Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white h-[380px] 2xl:h-[700px] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="text-center py-6" colSpan="5">
                    <p className="text-2xl 2xl:text-5xl  font-semibold">
                      No applications for this job yet...
                    </p>
                    <p className="text-xl 2xl:text-4xl  font-semibold my-3">
                      upload your first
                      <span className="text-indigo-500 ms-2">CVs!</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className=" text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="2xl:text-xl">
                  <th scope="col" className="px-6 py-3 ">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button
                      onClick={handleSortByCreatedAt}
                      className="flex items-center focus:outline-none hover:cursor-pointer"
                    >
                      Created at
                      {sortDirectionC === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4 ml-1 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Ai Rating
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
                {skeletron ? (
                  <tr className="text-sm 2xl:text-lg border-b">
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-lg"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-lg"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-lg"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-lg"></div>
                    </td>{" "}
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-lg"></div>
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {currentApplicants.map((applicant) => (
                  console.log(applicant),
                  <tr
                    key={applicant.thread_id}
                    className="2xl:text-lg bg-white border-b"
                  >
                    <td className="px-6 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.fullname || "n/d"}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">{applicant.age || "n/d"}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {applicant.city || "n/d"}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/user-details/${applicant.thread_id}`}>
                        <div className="w-full">
                          {new Date(applicant.cv_created_at).toLocaleString()}
                        </div>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <PiStarFill
                            key={index}
                            className={`text-${
                              index < applicant.rating ? "yellow" : "gray"
                            }-300 w-4 h-4 2xl:w-6 2xl:h-6`}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* PAGINAZIONE */}
          <div
            className={`${
              totalApplicants >= 1 ? "block" : "hidden"
            } flex items-center justify-between  bg-white px-6 py-2 2xl:p-6`}
          >
            <div className="flex flex-1 justify-between sm:hidden">
              <Link
                onClick={() => handlePageChange(currentPage - 1)}
                className={`${
                  currentPage === 1 ? "disabled" : ""
                } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50`}
              >
                Previous
              </Link>
              <Link
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages ? "hidden" : ""
                } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50`}
              >
                Next
              </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm 2xl:text-base text-gray-700">
                  Showing{" "}
                  <span className="font-semibold text-indigo-500">1</span> to{" "}
                  <span className="font-semibold text-indigo-500">
                    {currentApplicants.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-indigo-500">
                    {totalApplicants}
                  </span>{" "}
                  results
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="">
                  <select
                    id="applicantsPerPage"
                    name="applicantsPerPage"
                    value={applicantsPerPage}
                    onChange={handleApplicantsPerPageChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value={checkDeviceSizeApplicantsTable}>
                      {checkDeviceSizeApplicantsTable}
                    </option>
                    <option value={25}>{25}</option>
                    <option value={50}>{50}</option>
                    <option value={100}>{100}</option>
                  </select>
                </div>

                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm mt-1"
                  aria-label="Pagination"
                >
                  <Link
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${
                      currentPage === 1 ? "disabled" : ""
                    } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageIndex = index + 1;
                    return (
                      <div
                        key={index}
                        className={`${
                          currentPage === pageIndex
                            ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        }`}
                      >
                        <Link
                          onClick={() => handlePageChange(pageIndex)}
                          className={`${
                            currentPage === pageIndex
                              ? "flex items-center justify-center px-4 py-2 text-xs font-semibold text-white"
                              : "flex items-center justify-center px-4 py-2 text-xs font-semibold text-gray-900"
                          }`}
                        >
                          {pageIndex}
                        </Link>
                      </div>
                    );
                  })}
                  <Link
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
