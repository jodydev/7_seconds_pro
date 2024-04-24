import { useAppContext } from "../context/AppContext";
import Job from "./Modal/Job";
import Paginations from "./Paginations";

export default function RecentJobPostings() {
  const { modalOpen, openModal, closeModal } = useAppContext();

  const goToDetails = () => {
    window.location.href = "/job-details";
  };

  // ULTIMI 5 LAVORI PUBBLICATI
  const jobs = [
    {
      id: 1,
      companyName: "Google",
      role: "Front-end Developer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 2,
      companyName: "Facebook",
      role: "Ai Engineer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 3,
      companyName: "Amazon",
      role: "Business Analyst",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 4,
      companyName: "Apple",
      role: "Software Engineer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 5,
      companyName: "Google",
      role: "Front-end Developer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 6,
      companyName: "Google",
      role: "Front-end Developer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 7,
      companyName: "Amazon",
      role: "Business Analyst",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 8,
      companyName: "Apple",
      role: "Software Engineer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 9,
      companyName: "Google",
      role: "Front-end Developer",
      seniority: "Senior",
      cvsNum: 10,
    },
    {
      id: 10,
      companyName: "Google",
      role: "Front-end Developer",
      seniority: "Senior",
      cvsNum: 10,
    }
  ];

  return (
    <section>
      {modalOpen && <Job closeModal={closeModal} />}
      <div data-aos="fade-left">
        <div
          className={`${
            modalOpen ? "opacity-10" : "opacity-100"
          } bg-white px-6 py-8 shadow-lg rounded-2xl my-20`}
        >
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
            <div className="ml-4 mb-4">
              <h3 className="text-5xl font-bold leading-6 text-gray-900">
                Job Postings
              </h3>
            </div>
            <div className="flex-shrink-0 ms-3 my-5">
              <button
                onClick={openModal}
                type="button"
                className="relative inline-flex items-center rounded-md bg-indigo-600 px-6 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 me-2"
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
              <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-2xl">
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
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={goToDetails}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 text-2xl">{job.companyName}</td>
                    <td className="px-6 py-4 text-2xl">{job.role}</td>
                    <td className="px-6 py-4 text-2xl">{job.seniority}</td>
                    <td className="px-6 py-4 text-2xl">{job.cvsNum}</td>
                    {/* <td className="px-6 py-4">{job.contract}</td>
                  <td className="px-6 py-4">{job.location}</td> */}
                  </tr>
                ))}
                <tr>
                  <td colSpan="7" className="px-4 py-2">
                    <Paginations />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
