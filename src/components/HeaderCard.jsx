import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import {
  BriefcaseIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { useJobs } from "../context/JobContext";
import { useEffect, useState } from "react";
import supabase from "../supabase/client";

const WorkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-white"
  >
    <path
      fillRule="evenodd"
      d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      clipRule="evenodd"
    />
    <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-white"
  >
    <path
      fillRule="evenodd"
      d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
      clipRule="evenodd"
    />
    <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
    <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
  </svg>
);

export default function HeaderCard() {
  const { modalOpen } = useAppContext();
  const { totalJobs, fileCount } = useJobs();
  const location = useLocation();
  const [accountCredits, setAccountCredits] = useState(0);
  const [userId, setUserId] = useState("");
  const [subscription, setSubscription] = useState();

  //! Funzione per recuperare l'ID dell'utente attualmente loggato
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user;

        setUserId(user.id);
        getAccountCredits(user.id);
      } catch (error) {
        console.error(
          "Errore durante il recupero dell'ID dell'utente:",
          error.message
        );
      }
    };

    fetchUserId();
  }, []);

  //! Funzione per ottenere i crediti da tabella accounts
  const getAccountCredits = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("userid", userId);

      if (error) {
        console.error(
          "Errore durante il caricamento dei crediti dell'account:",
          error.message
        );
      } else {
        setAccountCredits(data[0].credits_total || 0);
        setSubscription(data[0].subscription_plan );
      }
    } catch (error) {
      console.error(
        "Errore durante il caricamento dei crediti dell'account:",
        error.message
      );
    }
  };

  const config = {
    home: [
      {
        name: "Jobs",
        stat: totalJobs,
        icon: WorkIcon,
        aos: "fade-down",
        bgCard: "indigo-700",
      },
      {
        name: "CVs",
        stat: fileCount,
        icon: FileIcon,
        aos: "fade-down",
        bgCard: "indigo-600",
      },
      {
        name: "Credits",
        stat: accountCredits,
        icon: BsStars,
        aos: "fade-down",
        bgCard: "indigo-500",
      },
      {
        name: "Subscription",
        stat: subscription,
        icon: FaUsers,
        aos: "fade-down",
        bgCard: "white",
        colorText: "gray-900",
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
        key={index}
        className={`overflow-hidden rounded-2xl ${
          item.bgCard ? `bg-${item.bgCard}` : ""
        } ${
          item.colorText ? `text-${item.colorText}` : "text-white"
        } px-4 py-8 shadow-lg flex-col items-center justify-center hover:cursor-pointer `}
      >
        <div className="flex items-center justify-center gap-3">
          <p className="ml-2 truncate text-xl 2xl:text-4xl font-medium ">
            {item.name}
          </p>
          <item.icon className="h-6 w-6 2xl:h-8 2xl:w-8 " />
        </div>
        <div
          className={`${
            item.colorText ? `border-${item.colorText}` : "border-white"
          } flex items-center justify-center border-t-2 mt-3  `}
        >
          <p className="mt-3 text-2xl 2xl:text-5xl font-semibold flex gap-1 tracking-tight">
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
