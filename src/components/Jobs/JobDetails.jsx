import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  CalendarIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/20/solid";
import { BsBuildingsFill } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import FilterUsersForJob from "../Users/FilterUsersForJob";
import Ai from "../Modal/Ai";

export default function JobDetails() {
  const { modalOpen, openModal, closeModal } = useAppContext();

  return (
    <section data-aos="fade-right" id="detailsjob">
      {modalOpen && <Ai closeModal={closeModal} />}
      <div
        className={`${
          modalOpen ? "opacity-10" : "opacity-100"
        } bg-white px-6 py-8 shadow-lg rounded-2xl mt-10`}
      >
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl 2xl:text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Front End Developer [Apple.inc] - Junior
            </h2>

            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
              {/* <div className="mt-2 flex items-center text-sm text-gray-500">
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
              </div> */}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Created at April 9, 2024
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <button
              onClick={openModal}
              type="button"
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-4 2xl:px-10 py-2 2xl:py-6 text:xl 2xl:text-3xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <BsStars className="me-2" />
              Upload CVs
            </button>

            {/* <Link to="/jobs" className="ml-3">
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
            </Link> */}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
            </div> */}
            <div className="px-10 py-16 w-full">
              <p className="text-base font-medium leading-6 text-gray-900">
                Job Description: <br /> <br /> About Us: Tech Innovations Ltd. is a cutting-edge technology
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
              </p>
              {/* <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                
              </dd> */}
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
