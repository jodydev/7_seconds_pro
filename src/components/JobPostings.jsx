import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useJobs } from "../context/JobContext";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import Job from "./Modal/Job";
import Loader from "./Loader";

export default function JobPostings() {
  const { modalOpen, openModal, closeModal } = useAppContext();
  const { filterJobs, loading, totalJobs } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const jobsPerPage = 11;

  // Calcola l'indice del primo e dell'ultimo lavoro nella pagina corrente
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = showAllJobs
    ? filterJobs
    : filterJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

  // Mostra tutti i lavori
  const handleShowAllJobs = () => setShowAllJobs(!showAllJobs);

  // Calcola gli indici di inizio e fine per la visualizzazione dei link della paginazione
  const maxPageButtons = 5; // Numero massimo di pulsanti di pagina mostrati
  let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  return (
    <section>
      {modalOpen && <Job closeModal={closeModal} />}
      <div
        data-aos="fade-left"
        data-aos-easing="linear"
        data-aos-duration="1000"
      >
        <div
          className={`${
            modalOpen ? "opacity-10" : "opacity-100"
          } bg-white px-6 py-8 shadow-lg rounded-2xl my-10 2xl:my-20`}
        >
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
            <div className="ml-4 mb-2">
              <h3 className="text-3xl 2xl:text-5xl font-bold leading-6 text-gray-900">
                Job Postings
              </h3>
            </div>
            <div className="flex-shrink-0 ms-3 my-5">
              {filterJobs.length > 0 && (
                <button
                  onClick={openModal}
                  type="button"
                  className="relative inline-flex items-center rounded-xl bg-indigo-600 px-4 2xl:px-6 py-2 2xl:py-4 text:xl 2xl:text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <TbSquareRoundedPlusFilled className="w-6 h-6 me-2" />
                  New Job
                </button>
              )}
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
            {loading && <Loader />}
            {currentJobs.length > 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-sm text-gray-700 bg-gray-50">
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
                <tbody className="hover:cursor-pointer">
                  {currentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="2xl:text-xl bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-[800px]">
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
              </table>
            )}

            {/* PAGINAZIONE */}
            <div className="flex items-center justify-between  bg-white p-6">
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
                    <span className="font-semibold text-indigo-500">11</span> of{" "}
                    <span className="font-semibold text-indigo-500">
                      {totalJobs}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer me-10">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={showAllJobs}
                      onChange={handleShowAllJobs}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-500 rounded-full peer dark:bg-indigo-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Show All
                    </span>
                  </label>

                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <Link
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    {Array.from(
                      { length: endPage - startPage + 1 },
                      (_, index) => {
                        const pageIndex = startPage + index;
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
                      }
                    )}

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
