import Paginations from "../Paginations";

export default function AllUsers() {
  const goToDetails = () => {
    window.location.href = "/user-details";
  };

  const users = [
    {
      id: 1,
      fullname: "Jody Ossino",
      age: "23",
      location: "Via del Successo 1, Bologna Italy",
      role: "Front-end Developer",
      email: "jody@example.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 2,
      fullname: "Giuseppe Bianchi",
      age: "37",
      location: "Via del Successo 1, Roma Italy",
      role: "Ai Engineer",
      email: "pippo@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 3,
      fullname: "Sandro Rossi",
      age: "45",
      location: "Via del Successo 1, Milano Italy",
      role: "Business Analyst",
      email: "rossi@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 4,
      fullname: "Maria Verdi",
      age: "28",
      location: "Via del Successo 1, Torino Italy",
      role: "Software Engineer",
      email: "maria@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 5,
      fullname: "Giulia Neri",
      age: "33",
      location: "Via del Successo 1, Napoli Italy",
      role: "Front-end Developer",
      email: "giulia@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 6,
      fullname: "Jody Ossino",
      age: "23",
      location: "Via del Successo 1, Bologna Italy",
      role: "Front-end Developer",
      email: "jody@example.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 7,
      fullname: "Giuseppe Bianchi",
      age: "37",
      location: "Via del Successo 1, Roma Italy",
      role: "Ai Engineer",
      email: "pippo@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 8,
      fullname: "Sandro Rossi",
      age: "45",
      location: "Via del Successo 1, Milano Italy",
      role: "Business Analyst",
      email: "rossi@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 9,
      fullname: "Maria Verdi",
      age: "28",
      location: "Via del Successo 1, Torino Italy",
      role: "Software Engineer",
      email: "maria@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 10,
      fullname: "Giulia Neri",
      age: "33",
      location: "Via del Successo 1, Napoli Italy",
      role: "Front-end Developer",
      email: "giulia@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 11,
      fullname: "Jody Ossino",
      age: "23",
      location: "Via del Successo 1, Bologna Italy",
      role: "Front-end Developer",
      email: "jody@example.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 12,
      fullname: "Giuseppe Bianchi",
      age: "37",
      location: "Via del Successo 1, Roma Italy",
      role: "Ai Engineer",
      email: "pippo@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
    {
      id: 13,
      fullname: "Sandro Rossi",
      age: "45",
      location: "Via del Successo 1, Milano Italy",
      role: "Business Analyst",
      email: "rossi@gmail.com",
      selectedJob: "HR Assistant (Tesla)",
      score: "5%",
    },
  ];

  return (
    <section>
      <div className="bg-white px-4 py-4 sm:px-6 shadow-lg rounded-2xl mt-10">
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
          <div className="ml-4 mb-4">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">
              All Users
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Here you can see all the users insert in the platform. Click on
              the user to see more details.
            </p>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Selected Job
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="hover:cursor-pointer">
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={goToDetails}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{user.fullname}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{user.age}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{user.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{user.role}</p>
                  </td>
                  <td className="px-6 py-4">
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

              <tr>
                <td colSpan="7" className="px-4 py-2">
                  <Paginations />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
