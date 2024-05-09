import { useJobs } from "../../context/JobContext";
import { PiStarFill } from "react-icons/pi";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";

export default function FilterUsersForJob({ skeletron }) {
  const { modalOpen } = useAppContext();
  const [applicants, setApplicants] = useState([]);
  const jobId = useParams().id;
  const { cvsForJob, totalJobs } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [currentApplicants, setCurrentApplicants] = useState(0);
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const pageSize = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
  const endPage = Math.min(totalPages, startPage + pageSize - 1);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = showAllJobs
    ? cvsForJob
    : cvsForJob.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleJobsPerPageChange = (event) => {
    setJobsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  //! Funzione per prendere i candidati per un lavoro specifico
  const getUserForJob = async (jobId) => {
    try {
      const { data, error } = await supabase
        .from("cvs_data")
        .select("*")
        .eq("jobid", jobId);

      setApplicants(data);
      setCurrentApplicants(data.length);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Errore durante il caricamento dei jobs:", error.message);
    }
  };

  useEffect(() => {
    getUserForJob(jobId);
    console.log(applicants);
  }, [jobId]);

  return (
    <section
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1000"
    >
      <div
        className={`${
          modalOpen ? "opacity-10" : "opacity-100"
        } bg-white px-6 py-8 shadow-lg rounded-2xl mt-10`}
      >
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
          <div className="ml-4 mb-4">
            <h3 className="text-3xl font-bold leading-6 text-gray-900">
              Applicants
            </h3>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
          {applicants.length >= 1 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created at
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Ai Rating
                  </th>
                </tr>
              </thead>
              <tbody className="hover:cursor-pointer">
                {skeletron
                  ? (console.log(skeletron),
                    (
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4">
                          <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded-lg"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded-lg"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded-lg"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded-lg"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded-lg"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : ""}
                {applicants.map((applicants) => (
                  <tr key={applicants.thread_id} className="bg-white border-b">
                    <td className="px-6 py-4">
                      <Link to={`/user-details`}>
                        <div className="w-full">
                          {applicants.fullname || "Jody Ossino"}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/user-details`}>
                        <div className="w-full">{applicants.age || "23"}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/user-details`}>
                        <div className="w-full">
                          {applicants.city || "Bologna"}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/user-details`}>
                        <div className="w-full">
                          {new Date(applicants.created_at).toLocaleDateString()}
                        </div>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {applicants.rating === null ? (
                        ""
                      ) : (
                        <div className="flex items-center">
                          {[...Array(applicants.rating)].map((_, index) => (
                            <p key={index}>
                              <PiStarFill className="text-yellow-300" />
                            </p>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <tr className="bg-white h-[700px] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="text-center py-6" colSpan="5">
                    <p className="text-5xl font-semibold">
                      No applications for this job yet...
                    </p>
                    <p className="text-4xl font-semibold my-3">
                      upload your first
                      <span className="text-indigo-500 ms-2">CVs!</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {/* PAGINAZIONE */}
          <div
            className={`${
              applicants.length >= 1 ? "block" : "hidden"
            } flex items-center justify-between  bg-white p-6`}
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
                <p className="2xl:text-base text-gray-700">
                  Showing{" "}
                  <span className="font-semibold text-indigo-500">1</span> to{" "}
                  <span className="font-semibold text-indigo-500">
                    {currentApplicants}
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
                    <option value={10}>10</option>
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
