import { FaWandMagicSparkles } from "react-icons/fa6";
// import Score from "./Score";

export default function AiCvs() {
  const users = [
    {
      id: 1,
      fullname: "Jody Ossino",
      age: "23",
      location: "Via del Successo 1, Bologna Italy",
      role: "Front-end Developer",
      email: "jody@example.com",
      selectedJob: "Front-end Developer (Apple.inc)",
      score: "80%",
    },
    {
      id: 1,
      fullname: "Gianluca Cirali",
      age: "30",
      location: "Via del Successo 1, Bologna Italy",
      role: "Full-stack Developer",
      email: "cirali@example.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
  ];

  const goToDetails = () => {
    window.location.href = "/user-details";
  };

  return (
    <div data-aos="fade-up" className="bg-white px-6 py-8 shadow-lg rounded-2xl mt-10">
      <div className="sm:flex sm:items-center border-b border-gray-200">
        <div className="sm:flex-auto">
          <div className="flex items-center ">
            <h2 className="text-3xl font-bold leading-6 text-gray-900">
              Results of the AI analysis
            </h2>
            <FaWandMagicSparkles className="w-6 h-6 ml-2" />
          </div>
          <p className="my-2 text-sm text-gray-700">
            Here you can see the results of the analysis of the CVs uploaded by
            the users.
          </p>
        </div>
      </div>
      <div className="mt-5 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Selected Job
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr
                    onClick={goToDetails}
                    key={user.id}
                    className="hover:bg-gray-50 hover:cursor-pointer"
                  >
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <p className="text-gray-900">{user.fullname}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{user.age}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{user.location}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{user.role}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{user.email}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{user.selectedJob}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="flex items-center">
                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                          {user.score}
                        </p>
                      </div>
                      {/* <Score score={user.score} /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
