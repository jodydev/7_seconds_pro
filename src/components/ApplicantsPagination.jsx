import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const ApplicantsPagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  totalPages,
  handlePageChange,
  handleItemsPerPageChange,
  itemsPerPageOptions,
  currentItemsLength,
  t,
}) => {
  return (
    <div
      className={`${
        totalItems >= 1 ? "block" : "hidden"
      } flex items-center justify-between bg-white px-6 py-2 2xl:p-6`}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`${
            currentPage === 1 ? "hidden" : ""
          } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50`}
        >
          {t("Previous")}
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`${
            currentPage === totalPages ? "hidden" : ""
          } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50`}
        >
          {t("Next")}
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm 2xl:text-base text-gray-700">
            {t("Showing")}{" "}
            <span className="font-semibold text-indigo-500">1</span> to{" "}
            <span className="font-semibold text-indigo-500">
              {currentItemsLength}
            </span>{" "}
            {t("of")}{" "}
            <span className="font-semibold text-indigo-500">{totalItems}</span>{" "}
            {t("results")}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <select
            id="itemsPerPage"
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm mt-1"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${
                currentPage === 1 ? "disabled" : ""
              } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">{t("Previous")}</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
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
                  <button
                    onClick={() => handlePageChange(pageIndex)}
                    className={`${
                      currentPage === pageIndex
                        ? "flex items-center justify-center px-4 py-2 text-xs font-semibold text-white"
                        : "flex items-center justify-center px-4 py-2 text-xs font-semibold text-gray-900"
                    }`}
                  >
                    {pageIndex}
                  </button>
                </div>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">{t("Next")}</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPagination;
