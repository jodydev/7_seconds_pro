import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const senioritys = [
  { id: 1, name: "Junior" },
  { id: 2, name: "Mid" },
  { id: 3, name: "Senior" },
];

const categories = [
  { id: 1, name: "IT" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
  { id: 4, name: "Design" },
  { id: 5, name: "Finance" },
  { id: 6, name: "HR" },
  { id: 7, name: "Management" },
  { id: 8, name: "Other" },
];

const contracts = [
  { id: 1, name: "Full Time" },
  { id: 2, name: "Part Time" },
  { id: 3, name: "Freelance" },
  { id: 4, name: "Internship" },
  { id: 5, name: "Temporary" },
  { id: 6, name: "Other" },
];

export default function NewModalJob({ closeModal, onResult }) {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [selected, setSelected] = useState(senioritys[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedContract, setSelectedContract] = useState(senioritys[0]);
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const resetForm = () => {
    document.getElementById("job-form").reset();
  };

  const editorConfiguration = {
    toolbar: {
      items: ["undo", "redo", "|", "heading", "|", "bold", "|", "italic"],
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
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0" />

        <div data-aos="fade-left" className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <form
                    id="job-form"
                    onSubmit={sendJob}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl "
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <DialogTitle className="text-2xl font-semibold leading-6 text-white">
                            Add a New Job
                            <FaPencil className="inline-block w-5 h-5 ml-3" />
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={closeModal}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-start text-indigo-300">
                            Get started by filling in the information below to
                            create a new job.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm text-start font-medium leading-6 text-gray-900"
                              >
                                {t("Company Name")}
                              </label>
                              <div className="mt-1">
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
                                htmlFor="description"
                                className="block text-sm font-medium text-start  leading-6 text-gray-900"
                              >
                                {t("Role")}
                              </label>
                              <div className="mt-1">
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

                            <div>
                              <label
                                htmlFor="sector"
                                className="block text-sm text-start font-medium leading-6 text-gray-900"
                              >
                                {t("Sector")}
                              </label>
                              <div className="mt-1">
                                <Listbox
                                  value={selectedCategory}
                                  onChange={setSelectedCategory}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                          <span className="flex items-center">
                                            <span className="block truncate">
                                              {selectedCategory.name}
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
                                            {categories.map((category) => (
                                              <Listbox.Option
                                                key={category.id}
                                                className={({ active }) =>
                                                  classNames(
                                                    active
                                                      ? "bg-indigo-600 text-white"
                                                      : "text-gray-900",
                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                  )
                                                }
                                                value={category}
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
                                                        {category.name}
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

                            <div>
                              <label
                                htmlFor="seniority"
                                className="block text-sm font-medium text-start  leading-6 text-gray-900"
                              >
                                {t("Seniority")}
                              </label>
                              <div className="mt-1">
                                <Listbox
                                  value={selected}
                                  onChange={setSelected}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-1">
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

                            <div>
                              <label
                                htmlFor="contract-type"
                                className="block text-sm font-medium text-start  leading-6 text-gray-900"
                              >
                                {t("Contract Type")}
                              </label>
                              <div className="mt-1">
                                <Listbox
                                  value={selectedContract}
                                  onChange={setSelectedContract}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                          <span className="flex items-center">
                                            <span className="block truncate">
                                              {selectedContract.name}
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
                                            {contracts.map((contract) => (
                                              <Listbox.Option
                                                key={contract.id}
                                                className={({ active }) =>
                                                  classNames(
                                                    active
                                                      ? "bg-indigo-600 text-white"
                                                      : "text-gray-900",
                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                  )
                                                }
                                                value={contract}
                                              >
                                                {({
                                                  selectedContract,
                                                  active,
                                                }) => (
                                                  <>
                                                    <div className="flex items-center">
                                                      <span
                                                        className={classNames(
                                                          selectedContract
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                          "block truncate"
                                                        )}
                                                      >
                                                        {contract.name}
                                                      </span>
                                                    </div>

                                                    {selectedContract ? (
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

                            <div>
                              <label
                                htmlFor="location"
                                className="block text-sm font-medium text-start  leading-6 text-gray-900"
                              >
                                {t("Location")}
                              </label>
                              <div className="mt-1">
                                <input
                                  required
                                  type="text"
                                  name="location"
                                  id="location"
                                  autoComplete="location"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="salary"
                                className="block text-sm text-start font-medium leading-6 text-gray-900"
                              >
                                {t("Bugdet Range")}
                              </label>
                              <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500 sm:text-sm">
                                    $
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="salary"
                                  id="salary"
                                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="0.00"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                  <label htmlFor="currency" className="sr-only">
                                    Currency
                                  </label>
                                  <select
                                    id="currency"
                                    name="currency"
                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                  >
                                    <option>USD</option>
                                    <option>EUR</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-start  leading-6 text-gray-900"
                              >
                                {t("Job Description")}
                              </label>
                              <div className="mt-1">
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
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={resetForm}
                      >
                        {t("Reset")}
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {t("Send")}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
