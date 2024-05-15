import { useState, useEffect } from "react";
import { PiStarFill } from "react-icons/pi";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import { BsStars } from "react-icons/bs";

export default function UserDetails() {
  const thread_id = useParams().id;
  const [applicants, setApplicants] = useState([]);

  //! funzione per ottenere il dettaglio del candidato per il lavoro selezionato
  useEffect(() => {
    const getApplicantsDetails = async (thread_id) => {
      try {
        const { data, error } = await supabase
          .from("cvs_data")
          .select("*")
          .eq("thread_id", thread_id);
        if (error) {
          console.error("Error fetching job details:", error.message);
        } else {
          setApplicants(data);
        }
      } catch (error) {
        console.error("Errore durante il caricamento dei jobs:", error.message);
      }
    };

    getApplicantsDetails(thread_id);
  }, [thread_id]);

  return (
    <>
      {applicants.map((applicant) => (
        <section
          key={applicant.thread_id}
          id="detailsjob"
          className="grid lg:grid-cols-2 gap-10"
        >
          <div data-aos="fade-right" className="flex justify-between py-10">
            <div className="min-w-0 flex-1 ">
              <div className="px-4 py-6 w-full mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 bg-white shadow-lg rounded-2xl">
                <div className="flex justify-between items-center gap-0 2xl:gap-60">
                  <div className="flex">
                    <h2 className="text-3xl ms-6 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                      {applicant.name || "Jody Ossino"}
                    </h2>
                    <div className="flex items-center ml-3">
                      {[...Array(5)].map((_, index) => (
                        <PiStarFill
                          key={index}
                          className={`text-${
                            index < applicant.rating ? "yellow" : "gray"
                          }-300 w-6 h-6`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-1 w-full">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Applied for:{" "}
                    <span className="font-bold text-indigo-500">
                      {applicant.job_title || "Apple.inc"}
                    </span>
                  </h3>

                  <div className="mt-3 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <p className="text-sm font-medium leading-6 text-gray-900">
                          Age:
                        </p>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {applicant.age || "23"}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <p className="text-sm font-medium leading-6 text-gray-900">
                          Location:
                        </p>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {applicant.city ||
                            "Via del Successo 1, Bologna, Italy"}
                        </dd>
                      </div>
                      {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0">
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
                      </div> */}
                    </dl>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <div className="min-w-0 flex-1 bg-white px-10 py-8 shadow-lg rounded-2xl">
                  <h2 className="text-3xl font-bold leading-7 text-gray-900 flex gap-1">
                    Canditate Summary <BsStars className="h-6 w-6" />
                  </h2>

                  <div className="mt-1 flex flex-col">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Ai Tips of {applicant.name || "Jody Ossino"} CVs for job
                      at
                      {applicant.job_title || " Apple.inc"}
                    </h3>

                    <div className="mt-3 border-t border-gray-100 ">
                      <p className="mt-3 text-sm max-w-2xl leading-7 text-gray-500 w-full">
                        {/* //!todo [aggiungere i consigli dell'AI] */}
                        After carefully reviewing your work experiences, skills,
                        and education, I'd like to provide you with some
                        feedback. Firstly, I'd like to commend you on your
                        extensive experience in the IT sector and the technical
                        skills you've acquired over the years. It's evident that
                        you've worked on a variety of complex projects and
                        achieved significant results in various domains.
                        However, I've noticed that there are some gaps in your
                        soft skills, such as time management and effective
                        communication. These are important areas to develop,
                        especially considering your interest in working in
                        collaborative and team-oriented environments. I would
                        recommend focusing on these areas for improvement and
                        seeking opportunities to hone your skills.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-10 px-10" data-aos="fade-left">
            <embed
              src={applicant.file}
              type="application/pdf"
              width="100%"
              height="1200px"
              className="shadow-2xl rounded-2xl"
            />
          </div>
        </section>
      ))}
    </>
  );
}
