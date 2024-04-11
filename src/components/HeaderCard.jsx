import {
  BriefcaseIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { BsStars } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

export default function HeaderCard() {
  const { modalOpen } = useAppContext();

  const stats = [
    { name: "Jobs", stat: "+71,897", icon: BriefcaseIcon },
    { name: "Users", stat: "+588", icon: FaUsers },
    { name: "Request", stat: "+248", icon: BsStars },
    { name: "CVs", stat: "+248", icon: DocumentDuplicateIcon },
  ];

  return (
    <div className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
      <img
        className="w-auto h-[50px]"
        src="/7secondspro-logo/1.png"
        alt="Your Company"
      />
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-2xl bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center gap-2">
              <p className="ml-2 truncate text-lg font-medium text-gray-500">
                {item.name}
              </p>
              <item.icon className="h-5 w-5 text-gray-400" />
            </div>
            <span className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
