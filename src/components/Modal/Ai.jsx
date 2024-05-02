import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { PlusIcon } from "@heroicons/react/20/solid";
import { GrDocumentPdf } from "react-icons/gr";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import supabase from "../../supabase/client";
import useAuth from "../../hook/useAuth";

export default function Ai({ closeModal }) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const deleteFile = async (indexToDelete) => {
    try {
      const fileToDelete = files[indexToDelete];
      await supabase.storage.from("cvfiles").remove([fileToDelete.id]);
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter(
          (file, index) => index !== indexToDelete
        );
        return updatedFiles;
      });
      console.log("File deleted successfully:", fileToDelete);
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  const uploadFile = async (e) => {
    try {
      const selectedFiles = Array.from(e.target.files);

      const upload = selectedFiles.map(async (file) => {
        const currentDate = Date.now();     
        const fileName = `${file.name.trim()}-${currentDate}`;

        const { data, error } = await supabase.storage
          .from("cvfiles")
          .upload(fileName, file, {
            cacheControl: "3600",
            expiresIn: "3600",
          });

        if (error) {
          console.error("Error uploading file:", error.message);
        } else {
          return data;
        }
      });

      const results = await Promise.all(upload);
      await sendData(results);

      
      setLoading(false);
      setFiles(results);
    } catch (error) {
      console.error("Error uploading files:", error.message);
      setLoading(false);
    }
  };

  const sendData = async (results) => {
    try {
      const endPoint = "https://mwhhpzjnpnmparvwqpua.supabase.co/storage/v1/object/public/";
      const cvsData = results.map((res) => ({
        file: `${endPoint}${res.fullPath}`,
        filename: res.path,
      }));
      const { data, error } = await supabase.from("cvs")
        .insert(cvsData)
        .select();

      if (error) {
        console.error("Error sending data to Supabase:", error.message);
      }
    } catch (error) {
      console.error("Error sending data to Supabase:", error.message);
    }
  };

  return (
    <div
      data-aos="zoom-in"
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-x-0 top-0 bottom-0 z-50 flex justify-center items-center"
    >
      <div className="relative p-10 w-full max-w-[90%] 2xl:max-w-[50%]">
        <div className="relative bg-white rounded-lg  dark:bg-gray-700 py-6 px-12 border border-indigo-50 shadow-lg shadow-indigo-500/50">
          <div className="flex items-center justify-between my-2 border-b rounded-t dark:border-gray-600 ">
            <h3 className="text-3xl my-2 font-semibold text-gray-900 dark:text-white">
              Upload CVs to Analyze
            </h3>
            <BsStars className="w-6 h-6 ml-2" />
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form>
            <div className="w-full h-full my-10">
              <div className="flex justify-center w-full px-6">
                <div className="text-center">
                  {loading ? (
                    <div className="loader my-40">
                      <p>Attendere, ottimizzazione in corso...</p>
                      <span className="words text-indigo-500">
                        <p className="word">curriculum</p>
                        <p className="word">competenze</p>
                        <p className="word">esperienze</p>
                        <p className="word">abilità</p>
                        <p className="word">valutazioni</p>
                      </span>
                    </div>
                  ) : (
                    <div>
                      {files.length <= 0 ? (
                        <div>
                          <svg
                            className="mx-auto h-26 w-26 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              vectorEffect="non-scaling-stroke"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                          </svg>
                          <h3 className="text-sm font-semibold text-gray-900">
                            No file uploaded
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Upload your files to start processing
                          </p>

                          <div className="mt-10">
                            <div className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex items-center"
                              >
                                <TbSquareRoundedPlusFilled className="me-2 h-5 w-5" />
                                Upload File
                              </label>

                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                multiple
                                onChange={uploadFile}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <svg
                            className="mx-auto h-26 w-26 max-h-[220px] text-gray-400"
                            dataslot="icon"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            />
                          </svg>
                          <h3 className="mb-5 text-sm font-semibold text-gray-900">
                            <span className="font-semibold text-indigo-500">
                              +{files.length}
                            </span>{" "}
                            File Uploaded Successfully
                          </h3>

                          {files.map((file, index) => (
                            <div
                              key={file.id}
                              className="bg-gray-50 px-4 py-1 my-3 rounded-xl hover:cursor-pointer"
                            >
                              <div className="lg:flex lg:items-center lg:justify-between my-3">
                                <div className="min-w-0 flex ">
                                  <GrDocumentPdf className="mx-3 h-5 w-5" />
                                  <p className="text-base font-semibold leading-7 text-gray-900 sm:truncate sm:text-base sm:tracking-tight">
                                    {file.path}
                                  </p>
                                </div>
                                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                                  <span className="hidden sm:block">
                                    <button
                                      onClick={() => deleteFile(index)}
                                      type="button"
                                      className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-600 hover:cursor-pointer"
                                    >
                                      <svg
                                        className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                                        dataslot="icon"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path
                                          clipRule="evenodd"
                                          fillRule="evenodd"
                                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                        />
                                      </svg>
                                      Delete
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
