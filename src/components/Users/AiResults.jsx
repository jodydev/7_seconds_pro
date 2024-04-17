import { BsStars } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import UserScore from "./UserScore";

export default function AiResults() {
  return (
    <div className="flex justify-between py-10">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tigh flex gap-1">
          Results of the AI <BsStars className="h-6 w-6" />
        </h2>

        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Ai Rating Score for Jody Ossino CVs
          </h3>

          <UserScore score={80} />

          <div className="mt-6 border-t border-gray-100">
            <h4 className="text-lg font-semibold leading-7 text-gray-900 mt-3 flex gap-1">
              Ai Tips <MdOutlineTipsAndUpdates className="h-5 w-5" />
            </h4>
            <p className="mt-3 text-sm max-w-2xl leading-8 text-gray-500">
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
              to hone your skills. Participating in workshops, training courses,
              or taking on additional responsibilities could be helpful in
              developing these competencies. Overall, your resume is impressive
              and shows strong potential. Keep working hard to improve your
              skills, and you'll be well-positioned to achieve your professional
              goals. If you have any questions or would like further feedback,
              please don't hesitate to reach out. I'm here to assist you on your
              professional journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
