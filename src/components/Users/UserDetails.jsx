import { useState, useEffect } from "react";
import { PiStarFill } from "react-icons/pi";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import { BsStars } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

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
          <div data-aos="fade-right" className="flex justify-between">
            <div className="min-w-0 flex-1 ">
              <div className="px-0 2xl:px-4 py-6 w-full mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 bg-white shadow-lg rounded-2xl">
                <div className="flex justify-between items-center gap-0 2xl:gap-60">
                  <div className="flex">
                    <h2 className="text-xl ms-6 font-bold leading-7 text-gray-900 sm:truncate 2xl:text-3xl sm:tracking-tight">
                      {applicant.fullname || "Nessun nome specificato"}
                    </h2>
                    <div className="flex items-center ml-3">
                      {[...Array(5)].map((_, index) => (
                        <PiStarFill
                          key={index}
                          className={`text-${
                            index < applicant.rating ? "yellow" : "gray"
                          }-300 w-4 h-4 2xl:w-6 2xl:h-6`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-1 w-full">
                  <h3 className="text-sm 2xl:text-base font-semibold leading-7 text-gray-900">
                    Applied for:{" "}
                    <span className="font-bold text-indigo-500">
                      {applicant.title ||
                        "Nessun titolo di lavoro specificato"}
                    </span>
                  </h3>

                  <div className="mt-3 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-3 2xl:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <p className="text-xs 2xl:text-sm font-medium leading-6 text-gray-900">
                          Age:
                        </p>
                        <dd className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {applicant.age || "Nessuna età specificata"}
                        </dd>
                      </div>
                      <div className="px-4 py-3 2xl:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <p className="text-xs 2xl:text-sm font-medium leading-6 text-gray-900">
                          Location:
                        </p>
                        <dd className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {applicant.city ||
                            "Nessuna città di residenza specificata"}
                        </dd>
                      </div>
                      <div className="px-4 py-3 2xl:py-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0">
                        <p className="text-xs 2xl:text-sm font-medium leading-6 text-gray-900">
                          Contacts:
                        </p>
                        <ul>
                          <li className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex text-nowrap items-center gap-3">
                            <BsFillTelephoneFill className="w-4 h-4 text-gray-400 hidden 2xl:block" />{" "}
                            {applicant.phone ||
                              "Nessun numero di telefono specificato"}
                          </li>
                          <li className="mt-1 text-xs 2xl:text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center gap-3 text-nowrap">
                            <MdEmail className="w-4 h-4 text-gray-400 hidden 2xl:block" />{" "}
                            {applicant.email ||
                              "Nessun indirizzo email specificato"}
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
                    Canditate Summary <BsStars className="h-6 w-6" />
                  </h2>

                  <div className="mt-1 flex flex-col">
                    <div className="mt-1 2xl:mt-3 border-t border-gray-100 ">
                      <p className="mt-1 2xl:mt-3 text-xs 2xl:text-sm max-w-2xl leading-7 text-gray-500 w-full">
                        {applicant.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:h-screen" data-aos="fade-left">
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
  );
}
