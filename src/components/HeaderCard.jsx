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
      { name: "Jobs", stat: "71,897", icon: BriefcaseIcon },
      { name: "Users", stat: "588", icon: FaUsers },
      { name: "Request", stat: "248", icon: BsStars },
      { name: "CVs", stat: "248", icon: DocumentDuplicateIcon },
    ],
    users: [
      { name: "Total Users", stat: "588", icon: FaUsers },
      {
        name: "Add Today",
        stat: "6",
        icon: MdGroupAdd,
        bgCard: "blue",
        bgProgress: "blue-light",
      },
      { name: "Add This Week", stat: "48", icon: MdGroupAdd },
      { name: "Add This Month", stat: "248", icon: MdGroupAdd },
    ],
    jobs: [
      {
        name: "Total Jobs",
        stat: "71,897",
        icon: BriefcaseIcon,
        bgCard: "blue",
      },
      { name: "Add Today", stat: "6", icon: MdDomainAdd, bgCard: "blue" },
      { name: "Add This Week", stat: "48", icon: MdDomainAdd },
      { name: "Add This Month", stat: "248", icon: MdDomainAdd },
    ],
    ai: [
      { name: "Total Requests", stat: "71,897", icon: BsStars },
      { name: "Requests Today", stat: "6", icon: FaWandMagicSparkles },
      { name: "Requests This Week", stat: "48", icon: FaWandMagicSparkles },
      { name: "Requests This Month", stat: "248", icon: FaWandMagicSparkles },
    ],
    documents: [
      { name: "Total CVs", stat: "71,897", icon: FaFilePdf },
      { name: "CVs Today", stat: "6", icon: FaFilePdf },
      { name: "CVs This Week", stat: "48", icon: FaFilePdf },
      { name: "CVs This Month", stat: "248", icon: FaFilePdf },
    ],
  };

  const renderCards = (pathname) => {
    const currentConfig = config[pathname.slice(1)]; // Rimuove lo slash iniziale
    if (!currentConfig) return null;

    return currentConfig.map((item, index) => (
      <div
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
      <Link to="/home" className="hidden sm:block">
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
