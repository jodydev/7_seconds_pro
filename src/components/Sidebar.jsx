import { useLocation, Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import { useAppContext } from "../context/AppContext";
import { BsStars } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  HomeIcon,
  XMarkIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { TbLogout2 } from "react-icons/tb";
import { getUserData } from "../hook/getUserData";
import { LuUser2 } from "react-icons/lu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Sidebar() {
  const { modalOpen } = useAppContext();
  const { subscription } = getUserData();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const trial = subscription === "trial";

  const navigation = [
    { name: "Dashboard", to: "/home", icon: HomeIcon, current: true },
    {
      name: trial ? "Upgrade Plan" : "Account Info",
      to: trial ? "/upgrade-plan" : "https://billing.stripe.com/p/login/28o29f66Ue515xeaEE",
      icon: trial ? BsStars : LuUser2,
      current: false,
    },
  ];

  const signOut = async () =>
    (await supabase.auth.signOut()) && navigate("/login");

  return (
    <header className={`${modalOpen ? "opacity-10" : "opacity-100"}`}>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center border-b border-gray-200">
                    <h3 className="text-2xl font-semibold leading-6 text-gray-900 mt-5 ">
                      Menu
                    </h3>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.to}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-indigo-600"
                                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-indigo-600"
                                      : "text-gray-400 group-hover:text-indigo-600",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 mt-10 ">
            Menu
          </h3>

          <nav className="flex flex-1 flex-col border-t text-gray-900 ">
            <ul role="list" className="flex flex-1 flex-col gap-y-2 mt-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={classNames(
                      location.pathname === item.to
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        location.pathname === item.to
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User profile and sign out */}
            <ul className="flex flex-col items-center mb-5">
              {/* <li className="my-2">
                <div className="group flex  gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold  text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                  <img
                    className="inline-block h-6 w-6 p-1 rounded-full ring-2 ring-indigo-500"
                    src="/7secondspro-logo/7secondspro-svg.png"
                    alt="User Profile"
                  />
                  {user && <p>{session.user.email}</p>}
                </div>
              </li> */}
              <li className="mt-auto w-full">
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full py-2 px-4 text-sm font-semibold bg-red-500 hover:bg-red-600 rounded-lg transition duration-300 ease-in-out"
                >
                  <TbLogout2 className="h-6 w-6 mr-2 text-white" />
                  <span className="text-white">Sign out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          <img
            className="w-auto h-[30px]"
            src="/7secondspro-logo/1.png"
            alt="7Seconds Pro"
          />
        </div>
      </div>
    </header>
  );
}
