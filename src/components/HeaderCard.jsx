import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useGetTotalJobs } from "../hook/useGetTotalJobs";
import { useFileCount } from "../hook/useFileCount";
import { getUserData } from "../hook/getUserData";
import { useTranslation } from "react-i18next";

const WorkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 2xl:w-8 2xl:h-8 text-white"
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
    className="w-5 h-5 2xl:w-8 2xl:h-8 text-white"
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
  const location = useLocation();
  const { modalOpen } = useAppContext();
  const { accountCredits, subscription } = getUserData();
  const totalJobs = useGetTotalJobs();
  const fileCount = useFileCount();
  const { t } = useTranslation();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const config = {
    home: [
      {
        name: t("Jobs"),
        stat: totalJobs,
        icon: WorkIcon,
        aos: isMobile ? "fade-left" : "fade-down",
        bgCard: "indigo-700",
        src: "/job-icon.png",
      },
      {
        name: "CVs",
        stat: fileCount,
        icon: FileIcon,
        aos: isMobile ? "fade-right" : "fade-down",
        bgCard: "indigo-700",
        src: "/cvs.png",
      },
      {
        name: t("Credits"),
        stat: accountCredits,
        icon: BsStars,
        aos: isMobile ? "fade-left" : "fade-down",
        bgCard: "indigo-700",
        src: "/credits.png",
      },
      {
        name: t("Subscription"),
        stat: subscription,
        icon: FaUsers,
        aos: isMobile ? "fade-right" : "fade-down",
        bgCard: "white",
        colorText: "gray-900",
        src: "/stars.png",
      },
    ],
  };

  const renderCards = (pathname) => {
    const currentConfig = config[pathname.slice(1)];
    if (!currentConfig) return null;

    return currentConfig.map((item, index) => (
      // <div
      //   data-aos={item.aos}
      //   key={index}
      //   className={`overflow-hidden rounded-2xl ${
      //     item.bgCard ? `bg-${item.bgCard}` : ""
      //   } ${
      //     item.colorText ? `text-${item.colorText}` : "text-white"
      //   }  shadow-lg flex-col items-center justify-center hover:cursor-pointer mt-5 2xl:mt-5`}
      // >
      <div data-aos={item.aos} key={index} class="card ">
        <svg
          fill="none"
          viewBox="0 0 342 175"
          height="200"
          width="400"
          xmlns="http://www.w3.org/2000/svg"
          className="background"
        >
          <path
            fill="url(#paint0_linear_103_640)"
            d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          ></path>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="128"
              x2="354.142"
              y1="128"
              x1="0"
              id="paint0_linear_103_640"
            >
              <stop stop-color="#5750ec"></stop>
              <stop stop-color="#362A84" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>
        <div class="absolute right-[-20px] top-[5px]">
          <img className="w-[100px]" src={item.src} />
        </div>
        <p class="mt-5 ms-3 text-white font-semibold text-5xl"> {item.stat}</p>
        <div class="info">
          <div class="ms-3">
            <p class="text-4xl text-nowrap font-medium">{item.name}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
      <div className="2xl:mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {renderCards(location.pathname)}
      </div>
    </div>
  );
}
