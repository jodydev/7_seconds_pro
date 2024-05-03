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
import useAuth from "../../hook/useAuth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../supabase/client";

export default function JobDetails() {
  const { modalOpen, openModal, closeModal } = useAppContext();
  const { session } = useAuth();
  const { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    async function fetchJobDetails() {
      const { data: jobs, error } = await supabase.from("jobs").select("*");
      if (error) {
        console.error("Error fetching job details:", error.message);
        return;
      }
      const job = jobs.find((job) => job.id === parseInt(id));
      if (!job) {
        console.error("Job not found for ID:", id);
        return;
      }
      setSelectedJob(job);
    }
    fetchJobDetails();
  }, [id]);


  return (
    <section data-aos="fade-right" id="detailsjob">
      {modalOpen && <Ai closeModal={closeModal} />}
      <div
        className={`${
          modalOpen ? "opacity-10" : "opacity-100"
        } bg-white px-6 py-8 shadow-lg rounded-2xl mt-10`}
      >
        {selectedJob && (
          <>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl 2xl:text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {`${selectedJob.role} [${selectedJob.company_name}] - ${selectedJob.seniority}`}
                  {/* Front End Developer [Apple.inc] - Junior */}
                </h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    posted{" "}
                    {selectedJob.created_at
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <button
                  onClick={openModal}
                  type="button"
                  className="relative inline-flex items-center rounded-xl bg-indigo-600 px-4 2xl:px-6 py-2 2xl:py-4 text:xl 2xl:text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <BsStars className="mx-3 w-5 h-5" />
                  Upload CVs
                </button>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="py-5 w-full">
                  <span className="text-xl font-semibold leading-6 text-gray-900">
                    Job Description: <br /> <br />{" "}
                    <p className="text-base font-light  leading-6 text-gray-900">
                      {selectedJob.description}
                    </p>
                  </span>
                </div>
              </dl>
            </div>
          </>
        )}
      </div>
      <FilterUsersForJob />
    </section>
  );
}
