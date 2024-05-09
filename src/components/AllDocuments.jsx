import Paginations from "./Paginations";
import { FaFilePdf } from "react-icons/fa6";

export default function AllDocuments() {

  // const documents = [
  //   {
  //     id: 1,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 2,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 3,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 4,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 5,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 6,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 7,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 8,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 9,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 10,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 11,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 12,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 13,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  //   {
  //     id: 14,
  //     name: "Cv_Jody_Ossino.pdf",
  //     size: "1.2 MB",
  //     type: "PDF",
  //     date: "2021-09-01",
  //   },
  // ];

  return (
    <section data-aos="fade-up">
      <div className="bg-white px-6 py-8 shadow-lg rounded-2xl mt-10">
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200">
          <div className="ml-4 mb-4">
            <h3 className="text-3xl font-bold leading-6 text-gray-900">
              All Documents
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              All documents uploaded by the users are displayed here.
            </p>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Document Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Uploaded
                </th>
              </tr>
            </thead>

            <tbody className="hover:cursor-pointer">
              {documents.map((document) => (
                <tr
                  key={document.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 flex items-center gap-2">
                    {" "}
          
                    <FaFilePdf className="h-5 w-5 text-gray-500" />{" "}
                  
                    <p>{document.name}</p>
                   
                  </td>
                  <td className="px-6 py-4">{document.size}</td>
                  <td className="px-6 py-4">{document.type}</td>
                  <td className="px-6 py-4">{document.date}</td>
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
