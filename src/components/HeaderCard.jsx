import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaWandMagicSparkles, FaFilePdf } from "react-icons/fa6";
import { MdGroupAdd, MdDomainAdd } from "react-icons/md";
import {
  BriefcaseIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

export default function HeaderCard() {
  const { modalOpen } = useAppContext();
  const location = useLocation();

  const config = {
    home: [
      { name: "Jobs", stat: "71,897", icon: BriefcaseIcon, aos: "fade-down" },
      { name: "Users", stat: "588", icon: FaUsers, aos: "fade-down" },
      { name: "Request", stat: "248", icon: BsStars, aos: "fade-down" },
      {
        name: "CVs",
        stat: "248",
        icon: DocumentDuplicateIcon,
        aos: "fade-down",
      },
    ],
    users: [
      { name: "Total Users", stat: "588", icon: FaUsers, aos: "fade-down" },
      {
        name: "Add Today",
        stat: "6",
        icon: MdGroupAdd,
        aos: "fade-down",
      },
      { name: "Add This Week", stat: "48", icon: MdGroupAdd, aos: "fade-down" },
      {
        name: "Add This Month",
        stat: "248",
        icon: MdGroupAdd,
        aos: "fade-down",
      },
    ],
    jobs: [
      {
        name: "Total Jobs",
        stat: "71,897",
        icon: BriefcaseIcon,
        aos: "fade-down",
      },
      { name: "Add Today", stat: "6", icon: MdDomainAdd, aos: "fade-down" },
      {
        name: "Add This Week",
        stat: "48",
        icon: MdDomainAdd,
        aos: "fade-down",
      },
      {
        name: "Add This Month",
        stat: "248",
        icon: MdDomainAdd,
        aos: "fade-down",
      },
    ],
    ai: [
      {
        name: "Total Requests",
        stat: "71,897",
        icon: BsStars,
        aos: "fade-down",
      },
      {
        name: "Requests Today",
        stat: "6",
        icon: FaWandMagicSparkles,
        aos: "fade-down",
      },
      {
        name: "Requests This Week",
        stat: "48",
        icon: FaWandMagicSparkles,
        aos: "fade-down",
      },
      {
        name: "Requests This Month",
        stat: "248",
        icon: FaWandMagicSparkles,
        aos: "fade-down",
      },
    ],
    documents: [
      { name: "Total CVs", stat: "71,897", icon: FaFilePdf, aos: "fade-down" },
      { name: "CVs Today", stat: "6", icon: FaFilePdf, aos: "fade-down" },
      { name: "CVs This Week", stat: "48", icon: FaFilePdf, aos: "fade-down" },
      {
        name: "CVs This Month",
        stat: "248",
        icon: FaFilePdf,
        aos: "fade-down",
      },
    ],
  };

  const renderCards = (pathname) => {
    const currentConfig = config[pathname.slice(1)]; // Rimuove lo slash iniziale
    if (!currentConfig) return null;

    return currentConfig.map((item, index) => (
      <div
        data-aos={item.aos}
        key={index}
        className={`overflow-hidden rounded-2xl ${
          item.bgCard ? `bg-${item.bgCard}` : ""
        } px-4 py-5 shadow sm:p-6`}
      >
        <div className="flex items-center gap-3">
          <p className="ml-2 truncate text-lg font-medium text-gray-500">
            {item.name}
          </p>
          <item.icon className="h-5 w-5 text-indigo-500" />
        </div>
        <p className="mt-1 text-2xl sm:text-4xl font-semibold flex gap-1 tracking-tight text-gray-900">
          <span className="flex items-center text-xl  text-indigo-500 font-semibold">
            +
          </span>{" "}
          {item.stat}
        </p>
      </div>
    ));
  };

  return (
    <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
      <Link data-aos="fade-down" to="/home" className="hidden sm:block">
        <img
          className="w-auto h-[50px]"
          src="/7secondspro-logo/1.png"
          alt="7Seconds Pro"
        />
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {renderCards(location.pathname)}
      </div>
    </div>
  );
}
