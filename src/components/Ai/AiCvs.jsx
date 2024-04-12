import { FaWandMagicSparkles } from "react-icons/fa6";

export default function AiCvs() {
  const people = [
    {
      id: 1,
      fullname: "Jody Ossino",
      age: "23",
      location: "Via del Successo 1, Bologna Italy",
      role: "Front-end Developer",
      email: "jody@example.com",
    },
  ];

  return (
    <div className="bg-white px-4 py-4 sm:px-6 shadow-lg rounded-2xl mt-10">
      <div className="sm:flex sm:items-center border-b border-gray-200">
        <div className="sm:flex-auto">
          <div className="flex items-center ">
            <h2 className="text-2xl font-semibold leading-6 text-gray-900">
              Results of the AI analysis
            </h2>
            <FaWandMagicSparkles className="w-6 h-6 ml-2" />
          </div>
          <p className="my-2 text-sm text-gray-700">
            Here you can see the results of the analysis of the CVs uploaded by
            the users.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
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
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <p className="text-gray-900">{person.fullname}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{person.age}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{person.location}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{person.role}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <p className="text-gray-900">{person.email}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
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
