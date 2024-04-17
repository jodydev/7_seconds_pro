import FileUpload from "./FileUpload";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { BsStars } from "react-icons/bs";

const jobs = [
  {
    id: 1,
    name: "Front-end Developer",
  },
  {
    id: 2,
    name: "Back-end Developer",
  },
  {
    id: 3,
    name: "Ai Engineer",
  },
  {
    id: 4,
    name: "Business Analyst",
  },
  {
    id: 5,
    name: "Software Engineer",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectJob() {
  const [selected, setSelected] = useState(jobs[3]);
  const [openUploadFile, setOpenUploadFile] = useState(false);

  const showUploadFiles = () => {
    setOpenUploadFile(true);
  };

  return (
    <div className="bg-white px-4 py-4 sm:px-6 shadow-lg rounded-2xl mt-10">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold leading-6 text-gray-900">
            {openUploadFile ? "Upload CVs to Analyze" : "Select Job to Analyze"}
          </h2>
          {openUploadFile ? (
            <BsStars className="w-6 h-6 ml-2" />
          ) : (
            <FaWandMagicSparkles className="w-6 h-6 ml-2" />
          )}
        </div>
      </div>

      <div className="flex mb-4 border-b border-gray-200">
        <p className="my-2 text-sm text-gray-700">
          {openUploadFile
            ? "Here you can see the results of the analysis of the CVs uploaded by the users."
            : "Here you can select the job you want to analyze the CVs for."}
        </p>
      </div>

      <div className="w-full">
        <div className="flex justify-center w-full px-6 py-0 sm:py-10">
          <div className="text-center">
            {openUploadFile ? (
              <FileUpload />
            ) : (
              <div className="p-20">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-start my-3 text-xl font-semibold leading-6 text-gray-900">
                        Select Job
                      </Listbox.Label>
                      <div className="relative mt-2 w-[500px]">
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
                            {jobs.map((job) => (
                              <Listbox.Option
                                key={job.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={job}
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
                                        {job.name}
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

                <div className="mt-10">
                  <button
                    onClick={showUploadFiles}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Continue
                    <MdNavigateNext
                      className="ms-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
