import { useState } from "react";
import { Textarea } from "flowbite-react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const senioritys = [
  { id: 1, name: "Junior" },
  { id: 2, name: "Mid" },
  { id: 3, name: "Senior" },
];

export default function Job({ closeModal, onResult }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(senioritys[0]);
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    document.getElementById("job-form").reset();
  };

  const editorConfiguration = {
    toolbar: {
      items: ["undo", "redo", "|", "heading", "|", "bold", "|", "italic" ],
    },
    placeholder: t("Enter your job description here..."),
    disableWatchdog: true,
  };

  const sendJob = async (e) => {
    e.preventDefault();
    try {
      const companyName = e.target.elements["company-name"].value;
      const role = e.target.elements["role"].value;
      const seniority = selected.name;

      const jobData = {
        company_name: companyName,
        description: jobDescription,
        role: role,
        seniority: seniority,
      };

      setFormErrors({});

      if (jobDescription.trim() === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          jobDescription: "Questo campo è obbligatorio.",
        }));
        return;
      }

      const { data, error } = await supabase
        .from("jobs")
        .insert([jobData])
        .select();
      if (error) {
        throw error;
      } else {
        closeModal();
        onResult(true);
        if (data && data.length > 0) {
          navigate(`/job-details/${data[0].id}`);
        } else {
          console.error("No data returned after insertion");
        }
      }
    } catch (error) {
      console.error("Error sending job:", error.message);
    }
  };

  return (
    <div
      data-aos="zoom-in"
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-3xl 2xl:max-w-5xl p-2 overflow-y-scroll md:overflow-hidden max-h-full ">
        <div className="relative p-6 md:p-10 w-full ">
          <div className="relative bg-white rounded-2xl py-6 px-4 md:px-12 border border-indigo-50 shadow-lg shadow-indigo-500/50">
            <div className="flex items-center justify-between border-b pb-3 mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {t("Add a New Job")}
                <FaPencil className="inline-block w-6 h-6 ml-3" />
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-5 h-5"
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

            <form id="job-form" onSubmit={sendJob}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {t("Job Information")}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {t(
                      "Fill in all fields correctly to continue with the request."
                    )}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {t("Company Name")}
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="company-name"
                          id="company-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {t("Role")}
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          type="text"
                          name="role"
                          id="role"
                          autoComplete="role"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="seniority"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {t("Seniority")}
                      </label>
                      <div className="mt-2">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                  <span className="flex items-center">
                                    <span className="block truncate">
                                      {selected.name}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {senioritys.map((seniority) => (
                                      <Listbox.Option
                                        key={seniority.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-indigo-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={seniority}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {seniority.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="job-description"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                      >
                        {t("Job Description")}
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setJobDescription(data);
                        }}
                      />
                      {formErrors.jobDescription && (
                        <span className="text-xs text-red-500 font-semibold">
                          {formErrors.jobDescription}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                >
                  {t("Reset")}
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("Send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
