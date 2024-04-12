import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PencilIcon,
  PaperClipIcon, ArrowUturnLeftIcon
} from "@heroicons/react/20/solid";
import { BsStars } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function DetailsJob() {
  return (
    <section id="detailsjob" className="px-20 py-10">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Front End Developer
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Full-time
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Remote
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              $120.000
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Publish on Aprile 9, 2024
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="ml-3 hidden sm:block">
            <a href="/">
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
            </a>
          </span>

          <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Edit
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <BsStars className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Ai
            </button>
          </span>

          {/* Dropdown */}
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
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      View
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="px-4 mt-5 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Review or edit the job description, requirements, and qualifications.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Company Name
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Apple.inc
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Application for
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Front End Developer
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Seniority
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Junior
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Work type
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Remote
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Protected categories
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              No
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Contract
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Stage
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Salary
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              $120,000
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Location
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            Apple Park, One Apple Park Way, Cupertino, CA 95014, Stati Uniti
            </dd>
          </div>
         
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Ai CVs
            </p>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
