import { BsStars } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export default function AiResults() {
  return (
    <div data-aos="fade-up" className="flex justify-between mt-10">
      <div className="min-w-0 flex-1 bg-white px-10 py-8 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold leading-7 text-gray-900 flex gap-1">
          Canditate Summary <BsStars className="h-6 w-6" />
        </h2>

        <div className="mt-1 flex flex-col">
          {/* <h3 className="text-base font-semibold leading-7 text-gray-900">
            Ai Rating Score of Jody Ossino CVs for Front End Developer at
            Apple.inc
          </h3> */}

          <div className="mt-3 border-t border-gray-100 ">
            {/* <h4 className="text-lg font-semibold leading-7 text-gray-900 mt-3 flex gap-1">
              Ai Tips <MdOutlineTipsAndUpdates className="h-5 w-5" />
            </h4> */}
            <p className="mt-3 text-sm max-w-2xl leading-7 text-gray-500 w-full">
              After carefully reviewing your work experiences, skills, and
              education, I'd like to provide you with some feedback. Firstly,
              I'd like to commend you on your extensive experience in the IT
              sector and the technical skills you've acquired over the years.
              It's evident that you've worked on a variety of complex projects
              and achieved significant results in various domains. However, I've
              noticed that there are some gaps in your soft skills, such as time
              management and effective communication. These are important areas
              to develop, especially considering your interest in working in
              collaborative and team-oriented environments. I would recommend
              focusing on these areas for improvement and seeking opportunities
              to hone your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
