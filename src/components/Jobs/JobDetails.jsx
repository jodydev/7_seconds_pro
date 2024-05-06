import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { BsStars } from "react-icons/bs";
import FilterUsersForJob from "../Users/FilterUsersForJob";
import Ai from "../Modal/Ai";
import useAuth from "../../hook/useAuth";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import Loader from "../Loader";
import { Alert } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";


export default function JobDetails() {
  const { modalOpen, openModal, closeModal } = useAppContext();
  const { session } = useAuth();
  const { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const handleResult = (data) => {
    setMessage(data);
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const { data: jobs, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching job details:", error.message);
          return;
        }

        setSelectedJob(jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error.message);
        setLoading(false);
      }
    }

    fetchJobDetails();
  }, [id]);

  return (
    <section>
      {modalOpen && <Ai onResult={handleResult} closeModal={closeModal} />}
      {loading && <Loader />}

      <div
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1000"
        className={`${
          modalOpen ? "opacity-10" : "opacity-100 shadow-md"
        } bg-white px-6 py-8  rounded-2xl my-10`}
      >
        {selectedJob && (
          <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl 2xl:text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {`${selectedJob.role} [${selectedJob.company_name}] - ${selectedJob.seniority}`}
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
                  <BsStars className="me-2 w-6 h-6" />
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
          </div>
        )}
      </div>
      {message && (
        <div
          data-aos="fade-left"
          className="flex items-center p-5 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <FaCheckCircle className="w-5 h-5 me-2" />
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium text-base">Upload Successful!</span>
          </div>
        </div>
      )}
      <FilterUsersForJob />
    </section>
  );
}
