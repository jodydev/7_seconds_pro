import { useAppContext } from "../context/AppContext";
import Job from "./Modal/Job";

export default function RecentJobPostings() {
  const { modalOpen, openModal, closeModal } = useAppContext();

  const goToDetails = () => {
    window.location.href = "/job-details";
  };

  const jobs = [
    {
      id: 1,
      companyName: "Google",
      role: "Front-end Developer",
      salary: "$120,000",
      seniority: "Senior",
      contract: "Full-time",
      location: "Mountain View, California",
    },
    {
      id: 2,
      companyName: "Facebook",
      role: "Ai Engineer",
      salary: "$130,000",
      seniority: "Senior",
      contract: "Full-time",
      location: "Menlo Park, California",
    },
    {
      id: 3,
      companyName: "Amazon",
      role: "Business Analyst",
      salary: "$110,000",
      seniority: "Senior",
      contract: "Full-time",
      location: "Seattle, Washington",
    },
    {
      id: 4,
      companyName: "Apple",
      role: "Software Engineer",
      salary: "$140,000",
      seniority: "Senior",
      contract: "Full-time",
      location: "Cupertino, California",
    },
    {
      id: 5,
      companyName: "Google",
      role: "Front-end Developer",
      salary: "$120,000",
      seniority: "Senior",
      contract: "Full-time",
      location: "Mountain View, California",
    },
  ];

  return (
    <section>
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
          <div className="flex-shrink-0 my-3 ms-3 sm:my-0 sm:ms-0">
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
            <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  Location
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
                  <td className="px-6 py-4">{job.companyName}</td>
                  <td className="px-6 py-4">{job.role}</td>
                  <td className="px-6 py-4">{job.salary}</td>
                  <td className="px-6 py-4">{job.seniority}</td>
                  <td className="px-6 py-4">{job.contract}</td>
                  <td className="px-6 py-4">{job.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
