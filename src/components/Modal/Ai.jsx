import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { GrDocumentPdf } from "react-icons/gr";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import supabase from "../../supabase/client";
import useAuth from "../../hook/useAuth";

export default function Ai({ closeModal, onResult, onUploadCv, refreshData }) {
  const { t } = useTranslation();
  const { session } = useAuth();
  const jobId = useParams().id;
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [ready, setReady] = useState(false);

  const deleteFiles = async (indexToDelete) => {
    try {
      const fileToDelete = files[indexToDelete];
      const { error } = await supabase.storage
        .from("cvfiles")
        .remove([fileToDelete.id]);
      if (error) {
        throw new Error(error.message);
      }

      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter(
          (file, index) => index !== indexToDelete
        );
        return updatedFiles;
      });

      if (files.length === 1) {
        setFiles([]);
        setReady(false);
      }
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  const getFiles = (event) => {
    const selectedFiles = event.target.files;
    const filesArray = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
    setReady(true);
  };

  const handleUpload = () => {
    setReady(false);
    setLoading(true);
    sendFiles(files);
  };

  const sendFiles = async (files) => {
    try {
      const upload = files.map(async (file) => {
        const currendDate = new Date().toISOString();
        const fileName = `${file.name}${currendDate}`;
        const { data, error } = await supabase.storage
          .from("cvfiles")
          .upload(fileName, file, {
            cacheControl: "3600",
            expiresIn: "3600",
          });

        if (error) {
          console.error("Error uploading file:", error.message);
          return { error };
        } else {
          return { data };
        }
      });

      const results = await Promise.all(upload);

      const successfulUploads = results.filter((result) => !result.error);

      await sendCvs(successfulUploads.map((result) => result.data));

      setFiles(successfulUploads.map((result) => result.data));
      setLoading(false);
      closeModal();
      onResult(true);
      onUploadCv(true);
      refreshData(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const sendCvs = async (results) => {
    try {
      const endPoint =
        "https://mwhhpzjnpnmparvwqpua.supabase.co/storage/v1/object/public/";
      const cvsData = results.map((res) => ({
        file: `${endPoint}${res.fullPath}`,
        filename: res.path,
        userid: session.user.id,
      }));
      const { data, error } = await supabase
        .from("cvs")
        .insert(cvsData)
        .select();

      if (error) {
        console.error("Error sending data to Supabase:", error.message);
      } else {
        const cvIds = data.map((cv) => cv.id);
        await sendThreads(cvIds, jobId);
      }
    } catch (error) {
      console.error("Error sending data to Supabase:", error.message);
    }
  };

  const sendThreads = async (cvIds, jobId) => {
    try {
      const threadData = cvIds.map((cvId) => ({
        cvid: cvId,
        jobid: jobId,
        status: "new",
      }));

      const { data, error } = await supabase.from("threads").insert(threadData);

      if (error) {
        console.error("Error sending data to Supabase:", error.message);
      }
    } catch (error) {
      console.error("Error sending data to Supabase:", error.message);
    }
  };

  return (
    <>
      <div
        data-aos="zoom-in"
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="flex overflow-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full md:max-w-[50%]">
          <div className="relative bg-white rounded-lg dark:bg-gray-700 py-4 px-6 md:py-6 md:px-12 border border-indigo-50 shadow-lg shadow-indigo-500/50">
            <div className="flex items-center justify-between my-2 border-b rounded-t dark:border-gray-600 ">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl my-2 font-semibold text-gray-900 dark:text-white">
                {files.length > 0
                  ? `${files.length} ${t("Selected files")}`
                  : t("Upload CVs to Analyze")}
              </h3>

              {files.length > 0 ? (
                ""
              ) : (
                <BsStars className="w-6 h-6 md:w-8 md:h-8 ml-2 text-yellow-300" />
              )}

              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 md:w-8 md:h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <span className="sr-only">{t("Close modal")}</span>
              </button>
            </div>

            <form>
              <div className="w-full h-full my-0 md:my-10">
                <div className="flex-col items-center justify-center w-full px-4 md:px-6 overflow-y-auto">
                  <div className="text-center max-h-[400px] ">
                    {loading ? (
                      <div className="loader py-10 sm:my-20 px-0 sm:px-10 2xl:px-60">
                        <p className="text-lg md:text-xl 2xl:text-2xl text-nowrap">
                          {t("Please wait, loading...")}
                        </p>
                        <span className="hidden sm:block words text-lg md:text-xl 2xl:text-2xl text-indigo-500">
                          <p className="word">{t("curriculum")}</p>
                          <p className="word">{t("skills")}</p>
                          <p className="word">{t("experiences")}</p>
                          <p className="word">{t("ability")}</p>
                          <p className="word">{t("ratings")}</p>
                        </span>
                      </div>
                    ) : (
                      <div>
                        {files.length <= 0 ? (
                          <div>
                            <img
                              src="/upload.gif"
                              alt="Upload File"
                              className="mx-auto h-[150px] w-[150px] md:h-[200px] md:w-[200px] 2xl:h-[260px] 2xl:w-[260px] text-gray-400"
                            />
                            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                              {t(
                                "Upload one or more files to start processing..."
                              )}
                            </h3>
                            <p className="text-xs md:text-sm italic my-1">
                              {t("*only accepts pdf files")}
                            </p>

                            <div className="my-5">
                              <div className="inline-flex items-center rounded-xl bg-indigo-500 px-3 py-2 md:px-4 md:py-3 2xl:px-5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <label
                                  htmlFor="file-upload"
                                  className="cursor-pointer flex items-center text-xs md:text-sm 2xl:text-lg"
                                >
                                  <TbSquareRoundedPlusFilled className="me-2 h-5 w-5 md:h-6 md:w-6" />
                                  {t("Upload Files")}
                                </label>

                                <input
                                  id="file-upload"
                                  type="file"
                                  className="hidden"
                                  accept=".pdf"
                                  multiple
                                  onChange={getFiles}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {ready && (
                              <div className="my-10">
                                <img
                                  src="/files.gif"
                                  alt="Files"
                                  className="mx-auto mb-5  h-[150px] w-[150px] md:h-[150px] md:w-[150px] 2xl:h-[200px] 2xl:w-[200px] text-gray-400"
                                />
                                {files.map((file, index) => (
                                  <div
                                    className="flex items-center justify-center"
                                    key={`${file.name}-${uuidv4()}}`}
                                  >
                                    <div className="bg-gray-50 my-1 px-2 py-2 md:px-4 md:py-3 md:my-2 rounded-xl hover:cursor-pointer w-full md:w-3/4 2xl:w-1/2">
                                      <div className="lg:flex lg:items-center lg:justify-between">
                                        <div className="min-w-0 flex">
                                          <GrDocumentPdf className="mx-3 h-5 w-5 md:h-6 md:w-6" />
                                          <p className="truncate text-sm md:text-base font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
                                            {file.name}
                                          </p>
                                        </div>
                                        <div className="mt-5 flex lg:ml-4 lg:mt-0">
                                          <span className="flex-row w-full">
                                            <button
                                              onClick={() => deleteFiles(index)}
                                              type="button"
                                              className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-red-600 hover:cursor-pointer"
                                            >
                                              <svg
                                                className="-ml-0.5 sm:mr-1.5 w-4 h-4 md:h-5 md:w-5 text-white"
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
                                              <p className="hidden sm:block">
                                                {t("Delete")}
                                              </p>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {ready && (
                  <div className="my-5 2xl:my-10 flex items-center justify-center gap-3 md:gap-5">
                    <div className="flex gap-2 md:gap-3 justify-center items-center rounded-xl bg-gray-50 px-3 py-2 md:px-4 md:py-3 text-xs md:text-base 2xl:text-lg font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex items-center text-xs md:text-base 2xl:text-lg"
                      >
                        <TbSquareRoundedPlusFilled className="me-2 h-5 w-5 md:h-6 md:w-6" />
                        {t("Upload More")}
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        multiple
                        onChange={getFiles}
                      />
                    </div>
                    <div className="flex gap-2 md:gap-3 justify-center items-center rounded-xl bg-indigo-500 px-3 py-2 md:px-4 md:py-3 text-xs md:text-base 2xl:text-lg font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <button
                        id="confirm-upload"
                        type="button"
                        className="flex items-center text-nowrap"
                        onClick={handleUpload}
                      >
                        <FaCheckCircle className="me-2 h-5 w-5 md:h-6 md:w-6" />
                        {t("Confirm")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
