import { PlusIcon, PencilIcon } from "@heroicons/react/20/solid";
import { BsStars } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [readyFiles, setReadyFiles] = useState([]);

  const getFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => prevFiles.concat(newFiles));
    console.log("get Files success:", newFiles);
  };

  const sendFile = (files) => {
    setLoading(true);
    console.log("Files uploaded success:", files);

    setTimeout(() => {
      setLoading(false);
      setReadyFiles(files);
      setFiles([]);
    }, 1232000);
  };

  const deleteFile = (indexToDelete) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (file, index) => index !== indexToDelete
      );
      return updatedFiles;
    });
  };

  return (
    <div className="bg-white px-4 py-4 sm:px-6 shadow-lg rounded-2xl mt-10">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex items-center ">
          <h2 className="text-2xl font-semibold leading-6 text-gray-900">
            Upload Files to AI
          </h2>
          <BsStars className="w-6 h-6 ml-2" />
        </div>
      </div>

      <div className="flex mb-4 border-b border-gray-200">
        <p className="my-2 text-sm text-gray-700">
          Here you can see the results of the analysis of the CVs uploaded by
          the users.
        </p>
      </div>

      <div className="w-full">
        <div className="flex justify-center w-full px-6 py-20">
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
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                      No file uploaded
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload your files to start processing
                    </p>
                    <div className="mt-6">
                      <div className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex items-center"
                        >
                          <PlusIcon
                            className="-ml-0.5 mr-1.5 h-5 w-5"
                            aria-hidden="true"
                          />
                          Upload File
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          multiple
                          onChange={getFile}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {files.map((file, index) => (
                      <div key={index}>
                        <svg
                          className="mx-auto h-26 w-26 max-h-[250px] text-gray-400"
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
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">
                          <span className="text-sm font-semibold text-indigo-500">
                            +{files.length}
                          </span>{" "}
                          File Uploaded
                        </h3>
                        <div className="lg:flex lg:items-center lg:justify-between my-5">
                          <div className="min-w-0 flex-1">
                            <p className="text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                              {file.name}
                            </p>
                          </div>
                          <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            <span className="hidden sm:block">
                              <button
                                onClick={() => deleteFile(index)}
                                type="button"
                                className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 hover:cursor-pointer"
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
                    <div className="mt-10 flex justify-center gap-3">
                      <div className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <label
                          htmlFor="send-file"
                          className="cursor-pointer flex items-center"
                        >
                          <BsStars
                            className="-ml-0.5 mr-1.5 h-5 w-5"
                            aria-hidden="true"
                          />
                          Send File to AI
                        </label>
                        <button
                          id="send-file"
                          type="submit"
                          onClick={sendFile}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {readyFiles.length >= 1 && (
                  <p>
                    File caricato con successo attendi che Ai elabori la
                    risposta!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
