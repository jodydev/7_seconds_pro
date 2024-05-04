import { useAppContext } from "../context/AppContext";
import { useJobs } from "../context/JobContext";
import { Link } from "react-router-dom";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import Job from "./Modal/Job";
import Paginations from "./Paginations";
import Loader from "./Loader";

export default function JobPostings() {
  const { modalOpen, openModal, closeModal } = useAppContext();
  const { filterJobs, loading } = useJobs();

  return (
    <section>
      {modalOpen && <Job closeModal={closeModal} />}
      <div data-aos="fade-left">
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
            {filterJobs.length > 0 ? (
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
                  {filterJobs.map((job) => (
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
                  <tr>
                    <td colSpan="7" className="px-4 py-2">
                      <Paginations />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              // <div className="flex items-center justify-center py-20 2xl:py-72">
              //   <div>
              //     <div className="flex-col justify-center items-center rounded-md text-center">
              //       <h3 className="text-4xl 2xl:text-4xl font-semibold text-gray-900">
              //         Add your first job
              //       </h3>
              //     </div>
              //     <div className="my-10 flex items-center justify-center">
              //       <button
              //         onClick={openModal}
              //         type="button"
              //         className="relative inline-flex items-center rounded-xl bg-indigo-600 px-4 2xl:px-6 py-2 2xl:py-4 text-xl 2xl:text-3xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              //       >
              //         <TbSquareRoundedPlusFilled className="w-8 h-8 me-3" />
              //         New Job
              //       </button>
              //     </div>
              //   </div>
              // </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
