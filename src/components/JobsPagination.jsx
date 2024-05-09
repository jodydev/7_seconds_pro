import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useJobs } from "../context/JobContext";

export default function JobsPagination() {

  const { cvsForJob , totalJobs } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const jobsPerPage = 11;

  // Calcola l'indice del primo e dell'ultimo lavoro nella pagina corrente
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = showAllJobs
    ? cvsForJob
    : cvsForJob.slice(indexOfFirstJob, indexOfLastJob);

  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(cvsForJob.length / jobsPerPage);

 // Cambia pagina
 const handlePageChange = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};

  // Mostra tutti i lavori
  const handleShowAllJobs = () => setShowAllJobs(!showAllJobs);

  // Calcola gli indici di inizio e fine per la visualizzazione dei link della paginazione
  const maxPageButtons = 5; // Numero massimo di pulsanti di pagina mostrati
  let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  // Se ci sono meno pulsanti di pagina del massimo consentito, aggiusta l'inizio e la fine
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  return (
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
            Showing <span className="font-semibold text-indigo-500">1</span> to{" "}
            <span className="font-semibold text-indigo-500">11</span> of{" "}
            <span className="font-semibold text-indigo-500">{totalJobs}</span>{" "}
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
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
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
  );
}
