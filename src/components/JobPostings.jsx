import Job from "./Modal/Job";
import { useAppContext } from "../context/AppContext";

export default function JobPostings() {
  const { modalOpen, openModal, closeModal } = useAppContext();

  return (
    <section id="jobposting">
      {modalOpen && <Job closeModal={closeModal} />}
      <div
        className={`${
          modalOpen ? "opacity-10" : "opacity-100"
        } bg-white px-4 py-4 sm:px-6 shadow-lg rounded-2xl mt-10`}
      >
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
          <div className="ml-4 mb-4">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">
              Recent Job Postings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit quam
              corrupti consectetur.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={openModal}
              type="button"
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Job
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  Seniority
                </th>
                <th scope="col" className="px-6 py-3">
                  Contract
                </th>
                <th scope="col" className="px-6 py-3">
                  Protected categories
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-semibold">Apple.inc</div>
                </th>
                <td className="px-6 py-4">React Developer</td>
                <td className="px-6 py-4">50.000$</td>

                <td className="px-6 py-4">Junior</td>
                <td className="px-6 py-4">Part-time</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Yes
                  </div>
                </td>
                <td className="px-6 py-4">
                  Via del successo 1, Bologna Italy 40010
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-semibold">Apple.inc</div>
                </th>
                <td className="px-6 py-4">React Developer</td>
                <td className="px-6 py-4">50.000$</td>

                <td className="px-6 py-4">Junior</td>
                <td className="px-6 py-4">Part-time</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                    No
                  </div>
                </td>
                <td className="px-6 py-4">
                  Via del successo 1, Bologna Italy 40010
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-semibold">Apple.inc</div>
                </th>
                <td className="px-6 py-4">React Developer</td>
                <td className="px-6 py-4">50.000$</td>

                <td className="px-6 py-4">Junior</td>
                <td className="px-6 py-4">Part-time</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Yes
                  </div>
                </td>
                <td className="px-6 py-4">
                  Via del successo 1, Bologna Italy 40010
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-semibold">Apple.inc</div>
                </th>
                <td className="px-6 py-4">React Developer</td>
                <td className="px-6 py-4">50.000$</td>

                <td className="px-6 py-4">Junior</td>
                <td className="px-6 py-4">Part-time</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Yes
                  </div>
                </td>
                <td className="px-6 py-4">
                  Via del successo 1, Bologna Italy 40010
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-semibold">Apple.inc</div>
                </th>
                <td className="px-6 py-4">React Developer</td>
                <td className="px-6 py-4">50.000$</td>

                <td className="px-6 py-4">Junior</td>
                <td className="px-6 py-4">Part-time</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Yes
                  </div>
                </td>
                <td className="px-6 py-4">
                  Via del successo 1, Bologna Italy 40010
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
