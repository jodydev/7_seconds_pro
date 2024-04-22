import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
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
import { BsBuildingsFill } from "react-icons/bs";
import FilterUsersForJob from "../Users/FilterUsersForJob";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function JobDetails() {
  return (
    <section data-aos="fade-right" id="detailsjob">
      <div className="bg-white px-6 py-8 shadow-lg rounded-2xl mt-10">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Applicant Information
            </h2>

            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BsBuildingsFill
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Apple.inc
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Front-end Developer
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Insert at April 9, 2024
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="ml-3 hidden sm:block">
              <Link to="/jobs">
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

            {/* Dropdown for mobile */}
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
                        to="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Edit
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        View
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
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
                Job Description
              </p>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                About Us: Tech Innovations Ltd. is a cutting-edge technology
                company specializing in developing innovative software solutions
                for various industries. Our team is composed of highly skilled
                professionals dedicated to pushing the boundaries of technology
                and creating impactful software products that solve real-world
                problems. Position Overview: We are seeking a talented and
                motivated Software Engineer to join our dynamic team. The
                successful candidate will play a key role in designing,
                developing, and maintaining software applications that drive our
                company's growth and success. This is an exciting opportunity
                for individuals passionate about technology and eager to
                contribute to groundbreaking projects in a fast-paced
                environment. Responsibilities: Collaborate with cross-functional
                teams to gather and analyze requirements. Design and develop
                high-quality software solutions that meet project requirements.
                Write clean, efficient, and maintainable code following best
                practices and coding standards. Conduct code reviews and provide
                constructive feedback to team members. Participate in the entire
                software development lifecycle, from concept to deployment and
                beyond.
              </dd>
            </div>
            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              jody@example.com
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Location
            </p>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Via del Successo 1, Bologna, Italy
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
                        resume_jody_ossino.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Link
                      to="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </Link>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
          </dl>
        </div>
      </div>

      <FilterUsersForJob />
    </section>
  );
}
