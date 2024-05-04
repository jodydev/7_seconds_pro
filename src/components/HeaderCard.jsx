import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import {
  BriefcaseIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { useJobs } from "../context/JobContext";

export default function HeaderCard() {
  const { modalOpen } = useAppContext();
  const { totalJobs, fileCount } = useJobs();
  const location = useLocation();

  const config = {
    home: [
      {
        name: "Jobs",
        stat: totalJobs,
        icon: BriefcaseIcon,
        aos: "fade-down",
      },
      {
        name: "CVs",
        stat: fileCount,
        icon: DocumentDuplicateIcon,
        aos: "fade-down",
      },
      { name: "Credits", stat: "259/500", icon: BsStars, aos: "fade-down" },
      {
        name: "Subscription",
        stat: "Premium",
        icon: FaUsers,
        aos: "fade-down",
      },
    ],
    // users: [
    //   { name: "Total Users", stat: "588", icon: FaUsers, aos: "fade-down" },
    //   {
    //     name: "Add Today",
    //     stat: "6",
    //     icon: MdGroupAdd,
    //     aos: "fade-down",
    //   },
    //   { name: "Add This Week", stat: "48", icon: MdGroupAdd, aos: "fade-down" },
    //   {
    //     name: "Add This Month",
    //     stat: "248",
    //     icon: MdGroupAdd,
    //     aos: "fade-down",
    //   },
    // ],
    // jobs: [
    //   {
    //     name: "Total Jobs",
    //     stat: "71,897",
    //     icon: BriefcaseIcon,
    //     aos: "fade-down",
    //   },
    //   { name: "Add Today", stat: "6", icon: MdDomainAdd, aos: "fade-down" },
    //   {
    //     name: "Add This Week",
    //     stat: "48",
    //     icon: MdDomainAdd,
    //     aos: "fade-down",
    //   },
    //   {
    //     name: "Add This Month",
    //     stat: "248",
    //     icon: MdDomainAdd,
    //     aos: "fade-down",
    //   },
    // ],
    // ai: [
    //   {
    //     name: "Total Requests",
    //     stat: "71,897",
    //     icon: BsStars,
    //     aos: "fade-down",
    //   },
    //   {
    //     name: "Requests Today",
    //     stat: "6",
    //     icon: FaWandMagicSparkles,
    //     aos: "fade-down",
    //   },
    //   {
    //     name: "Requests This Week",
    //     stat: "48",
    //     icon: FaWandMagicSparkles,
    //     aos: "fade-down",
    //   },
    //   {
    //     name: "Requests This Month",
    //     stat: "248",
    //     icon: FaWandMagicSparkles,
    //     aos: "fade-down",
    //   },
    // ],
    // documents: [
    //   { name: "Total CVs", stat: "71,897", icon: FaFilePdf, aos: "fade-down" },
    //   { name: "CVs Today", stat: "6", icon: FaFilePdf, aos: "fade-down" },
    //   { name: "CVs This Week", stat: "48", icon: FaFilePdf, aos: "fade-down" },
    //   {
    //     name: "CVs This Month",
    //     stat: "248",
    //     icon: FaFilePdf,
    //     aos: "fade-down",
    //   },
    // ],
    "job-details/:id": [
      {
        name: "CVs for this position",
        stat: "71",
        icon: BriefcaseIcon,
        aos: "fade-down",
      },
      { name: "Average Rating", stat: "4", icon: BsStars, aos: "fade-down" },
    ],
  };

  const renderCards = (pathname) => {
    const currentConfig = config[pathname.slice(1)];
    if (!currentConfig) return null;

    return currentConfig.map((item, index) => (
      <div
        data-aos={item.aos}
        data-aos-easing="linear"
        data-aos-duration="1000"
        key={index}
        className={`overflow-hidden rounded-2xl ${
          item.bgCard ? `bg-${item.bgCard}` : ""
        } px-4 py-5 shadow sm:p-6 flex-col items-center justify-center `}
      >
        <div className="flex items-center justify-center gap-3">
          <p className="ml-2 truncate text-xl 2xl:text-3xl font-medium text-gray-500">
            {item.name}
          </p>
          <item.icon className="h-6 w-6 2xl:h-8 2xl:w-8 text-indigo-500" />
        </div>
        <div className="flex items-center justify-center">
          <p className="mt-1 text-2xl 2xl:text-5xl font-semibold flex gap-1 tracking-tight text-gray-900">
            {item.stat}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {renderCards(location.pathname)}
      </div>
    </div>
  );
}
