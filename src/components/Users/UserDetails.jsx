import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import { BsStars } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { IoArrowUndo } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export default function UserDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //! funzione per tornare indietro
  const goBack = () => {
    navigate(-1);
  };
  
  //! funzione per ottenere i dettagli del lavoro selezionato tramite id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: applicantsData, error: applicantsError } = await supabase
          .from("cvs_data")
          .select("*")
          .eq("thread_id", id);
        if (applicantsError) {
          console.error("Error fetching applicants:", applicantsError.message);
        } else {
          setApplicants(applicantsData);
          setJobId(applicantsData[0]?.jobid);
        }

        const { data: jobData, error: jobError } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (jobError) {
          return;
        } else {
          setSelectedJob(jobData);
        }
        setLoading(false);
      } catch (error) {
        return;
      }
    };

    fetchData();
  }, [id, jobId]);


  return (
    <section>
      {loading && <Loader />}
      {selectedJob && (
        <>
          {applicants.map((applicant) => (
            <section
              key={applicant.thread_id}
              id="detailsjob"
              className="grid lg:grid-cols-2 gap-10 p-10"
            >
              <div data-aos="fade-right" className="flex justify-between">
                <div className="absolute left-[-20px] 2xl:left-[-25px] rounded-full">
                  <button
                    onClick={goBack}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                  >
                    <IoArrowUndo className="w-6 h-6" />
                  </button>
                </div>

                <div className="min-w-0 flex-1 ">
                  <div className="px-0 2xl:px-4 py-6 2xl:py-8 w-full mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 bg-white shadow-lg rounded-2xl">
                    <div className="flex justify-between items-center gap-0 2xl:gap-60">
                      <div className="flex">
                        <h2 className="text-xl ms-6 font-bold leading-7 text-gray-900 sm:truncate 2xl:text-4xl sm:tracking-tight">
                          {applicant.fullname || (
                            <div className="animate-pulse h-7 w-60 bg-gray-200 rounded-lg mb-1"></div>
                          )}
                        </h2>
                        <div className="flex items-center ml-5">
                          {applicant.rating !== null ? (
                            applicant.rating === 0 ? (
                              <span>n/d</span>
                            ) : (
                              <StarRatings
                                rating={applicant.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="22px"
                                starSpacing="2px"
                              />
                            )
                          ) : (
                            <div className="animate-pulse h-7 w-40 bg-gray-200 rounded-lg mb-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 w-full">
                      <h3 className="text-sm 2xl:text-lg font-semibold leading-7 text-gray-900">
                        {t("Applied for:")}{" "}
                        <a
                          href={`/job-details/${selectedJob.id}`}
                          className="font-bold text-indigo-500"
                        >
                          {selectedJob.role} {" @ "}
                          {applicant.title || (
                            <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                          )}
                        </a>
                      </h3>

                      <div className="mt-3 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                          <div className="px-4 py-3 2xl:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <p className="text-xs 2xl:text-sm font-medium leading-6 text-gray-900">
                              {t("Age: ")}
                            </p>
                            <dd className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {applicant.age || (
                                <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                              )}
                            </dd>
                          </div>
                          <div className="px-4 py-3 2xl:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <p className="text-xs 2xl:text-sm font-medium leading-6 text-gray-900">
                              {t("Location: ")}
                            </p>
                            <dd className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {applicant.city || (
                                <div className="animate-pulse h-6 bg-gray-200 rounded-lg"></div>
                              )}
                            </dd>
                          </div>
                          <div className="px-4 py-3 2xl:py-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0">
                            <p className="text-xs 2xl:text-sm font-medium leading-6 text-gray-900">
                              {t("Contacts: ")}
                            </p>
                            <ul>
                              <li className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex text-nowrap items-center gap-3">
                                <BsFillTelephoneFill className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400 hidden 2xl:block" />{" "}
                                {applicant.phone || (
                                  <div className="animate-pulse w-full h-4 bg-gray-200 rounded-lg my-1"></div>
                                )}
                              </li>
                              <li className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center gap-3 text-nowrap">
                                <MdEmail className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400 hidden 2xl:block" />{" "}
                                {applicant.email || (
                                  <div className="animate-pulse w-full h-4 bg-gray-200 rounded-lg"></div>
                                )}
                              </li>
                            </ul>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-5 2xl:mt-10">
                    <div className="min-w-0 flex-1 bg-white px-6 2xl:px-10 py-8 shadow-lg rounded-2xl">
                      <h2 className="text-xl 2xl:text-3xl font-bold leading-7 text-gray-900 flex gap-1">
                        {t("Canditate Summary")} <BsStars className="h-6 w-6" />
                      </h2>

                      <div className="mt-1 flex flex-col">
                        <div className="mt-1 2xl:mt-3 border-t border-gray-100 ">
                          <p className="mt-1 2xl:mt-5 text-xs 2xl:text-sm max-w-2xl leading-7 text-gray-500 w-full">
                            {applicant.feedback || (
                              <div className="flex-col">
                                <div className="animate-pulse w-3/4 h-6 bg-gray-200 rounded-lg"></div>
                                <div className="animate-pulse w-full h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/5 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/4 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-full h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/4 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-full h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/6 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/4 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-2/3 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/3 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-2/3 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/6 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-full h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/5 h-6 bg-gray-200 rounded-lg mt-2"></div>
                                <div className="animate-pulse w-3/4 h-6 bg-gray-200 rounded-lg mt-2"></div>
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="" data-aos="fade-left">
                <embed
                  src={applicant.file}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  className="shadow-2xl rounded-2xl"
                />
              </div>
            </section>
          ))}
        </>
      )}
    </section>
  );
}
