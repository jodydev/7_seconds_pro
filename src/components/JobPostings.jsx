import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import supabase from "../supabase/client";
import Job from "./Modal/Job";
import Loader from "./Loader";

export default function JobPostings() {
  const { modalOpen, openModal, closeModal, checkDeviceSizeJobTable } = useAppContext();
  const [totalJobs, setTotalJobs] = useState(0);
  const [cvsForJob, setCvsForJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(checkDeviceSizeJobTable);
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = showAllJobs
    ? cvsForJob
    : cvsForJob.slice(indexOfFirstJob, indexOfLastJob);

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

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleJobsPerPageChange = (event) => {
    setJobsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleResult = (data) => {
    setMessage(data);
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  //! Funzione per ottenere i jobs con il numero di cv associati
  useEffect(() => {
    const getFilterJobs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("jobs").select("*");
        if (error) {
          throw error;
        }

        const jobsWithCvsCount = await Promise.all(
          data.map(async (job) => {
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
    getFilterJobs();
  }, []);

  return (
    <section>
      {modalOpen && <Job onResult={handleResult} closeModal={closeModal} />}
      <div data-aos="fade-up">
        {message && (
          <div
            data-aos="fade-left"
            className="flex items-center p-5 my-5 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <FaCheckCircle className="w-5 h-5 me-2" />
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium text-base">
                Job Insert Successful!
              </span>
            </div>
          </div>
        )}
        <div
          className={`${modalOpen ? "opacity-10" : "opacity-100"} 
           ${message ? "my-0" : "my-10 2xl:my-20"}
           ${totalJobs === 0 ? "h-[600px] 2xl:min-h-[1000px]" : ""}
           bg-white px-6 py-4 shadow-lg rounded-2xl`}
        >
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
            <div className="ml-4 my-2 2xl:my-4">
              <h3 className="text-2xl 2xl:text-4xl font-bold leading-6 mb-2 text-gray-900">
                Job Postings
              </h3>
            </div>
            {totalJobs >= 1 && (
              <div className="flex-shrink-0 ms-3 mb-3">
                <button
                  onClick={openModal}
                  type="button"
                  className="relative inline-flex items-center rounded-xl bg-indigo-600 px-3 py-2 text-lg 2xl:text-xl hover:cursor-pointer font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <TbSquareRoundedPlusFilled className="w-6 h-6 me-2" />
                  New Job
                </button>
              </div>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
            {loading && <Loader />}

            {totalJobs >= 1 ? (
              <table className="w-full  text-left rtl:text-right text-gray-500">
                <thead className=" text-gray-700 bg-gray-50">
                  <tr className="2xl:text-xl">
                    <th scope="col" className="px-6 py-3">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Seniority
                    </th>
                    <th scope="col" className="px-6 py-3">
                      #CVs
                    </th>
                  </tr>
                </thead>
                <tbody className="hover:cursor-pointer">
                  {currentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="2xl:text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <Link to={`/job-details/${job.id}`}>
                          <div className="w-full">{job.company_name}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/job-details/${job.id}`}>
                          <div className="w-full">{job.role}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/job-details/${job.id}`}>
                          <div className="w-full">{job.seniority}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/job-details/${job.id}`}>
                          <div className="w-full">{job.cvsCount}</div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-[500px] 2xl:h-[800px]">
                <thead className="text-sm text-gray-700 bg-gray-50 ">
                  <tr className="2xl:text-2xl">
                    <th scope="col" className="px-6 py-3">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Seniority
                    </th>
                    <th scope="col" className="px-6 py-3">
                      #CVs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="text-center py-6" colSpan="4">
                      <p className="text-3xl 2xl:text-5xl font-semibold">
                        No Jobs Found...
                      </p>
                      <p className="text-xl 2xl:text-4xl font-semibold my-3">
                        Insert your first{" "}
                        <span className="text-indigo-500">Job!</span>
                      </p>
                      <button
                        onClick={openModal}
                        type="button"
                        className="my-3 inline-flex items-center rounded-xl bg-indigo-600 px-3 py-2 2xl:px-6 2xl:py-4 text-lg 2xl:text-2xl font-semibold text-white shadow-sm hover:cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <TbSquareRoundedPlusFilled className="w-6 h-6 me-2" />
                        New Job
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* PAGINAZIONE */}
            <div
              className={`${
                totalJobs >= 1 ? "block" : "hidden"
              } flex items-center justify-between  bg-white px-6 py-3 2xl:p-6`}
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
                      {currentJobs.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-indigo-500">
                      {totalJobs}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="">
                    <select
                      id="jobsPerPage"
                      name="jobsPerPage"
                      value={jobsPerPage}
                      onChange={handleJobsPerPageChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={checkDeviceSizeJobTable}>
                        {checkDeviceSizeJobTable}
                      </option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
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
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
