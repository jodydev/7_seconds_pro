import AiResults from "./AiResults";
import SuccessMessage from "../SuccessMessage";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { FaFilePdf } from "react-icons/fa6";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PencilIcon,
  PaperClipIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/20/solid";

export default function UserDetails() {
  const [open, setOpen] = useState(false);

  function downloadFile() {
    // Simuliamo il download del file
    setTimeout(() => {
      setOpen(true);
      // Apri il download del file qui, ad esempio:
      // window.open('URL_DEL_TUO_FILE');
    }, 1000); // Simula un ritardo di 1 secondo per il download
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000); // Chiudi il messaggio dopo 5 secondi
      return () => clearTimeout(timer);
    }
  }, [open]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {open && (
        <SuccessMessage message={"The file has been downloaded successfully"} />
      )}
      <section id="detailsjob" className="px-20 grid lg:grid-cols-2 gap-10">
        <div className="flex justify-between py-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Jody Ossino
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Front End Developer
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Inserted on Aprile 9, 2024
              </div> */}

              <div className="mt-3 w-full">
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Application for the position of Front End Developer at Apple.inc
                  </h3>
              
                </div>
                <div className="mt-3 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Full Name:
                      </p>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Jody Ossino
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Age:
                      </p>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        23
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Location:
                      </p>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Via del Successo 1, Bologna, Italy
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Role:
                      </p>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Front End Developer
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Education:
                      </p>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        High school graduation
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Experience:
                      </p>
                      <ul className="text-nowrap">
                        <li className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          - Software Developer Senior at Apple.inc
                        </li>
                        <li className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          - Software Developer Junior at Google.inc
                        </li>
                        <li className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          - Intership Business at Microsoft.inc
                        </li>
                      </ul>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 sm:px-0 xl:grid-cols-3">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Skills:
                      </p>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 gap-2 flex flex-wrap">
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          HTML
                        </span>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          CSS
                        </span>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          JAVASCRIPT
                        </span>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          REACT
                        </span>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          NODE JS
                        </span>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          SUPABASE
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        Contacts:
                      </p>
                      <ul className="">
                        <li className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex text-nowrap items-center gap-3">
                          <BsFillTelephoneFill className="w-4 h-4 text-gray-400" />{" "}
                          +39 3336170035
                        </li>
                        <li className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center gap-3">
                          <MdEmail className="w-4 h-4 text-gray-400" />{" "}
                          jodyossino.dev@gmail.com
                        </li>
                      </ul>
                    </div>

                    {/* More fields can be added here */}
                  </dl>
                </div>
                <div className="px-4 py-4 border-t border-gray-100 sm:px-0 flex gap-16 2xl:gap-60">
                  <p className="text-sm font-medium leading-6 text-gray-900">
                    CVs:
                  </p>
                  <ul role="list" className=" divide-gray-100">
                    <li className="flex justify-center items-center ms-4">
                      <div className="flex gap-3">
                        <FaFilePdf
                          className="h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm">
                            resume_back_end_developer.pdf
                          </p>
                          <p className="text-sm text-gray-400">2.4mb</p>
                        </div>
                      </div>
                    </li>
                    <li className="flex justify-end items-center mt-3">
                      <div className="flex gap-3">
                        <button className="font-semibold py-2 px-4 text-sm rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500">
                          Open
                        </button>
                        <button
                          onClick={downloadFile}
                          className="font-semibold py-2 px-4 text-sm rounded-full bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white"
                        >
                          Download
                        </button>
                      </div>
                    </li>
                    {/* More attachments can be added here */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="ml-3 hidden sm:block">
              <Link to="/users">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white me-3 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <ArrowUturnLeftIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Go back
                </button>
              </Link>
            </span>

            {/* Dropdown for mobile*/}
            <Menu as="div" className="relative ml-3 sm:hidden">
              <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                More
                <ChevronDownIcon
                  className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/users"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Go back
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Seconda colonna */}
        <AiResults />
      </section>
    </>
  );
}
