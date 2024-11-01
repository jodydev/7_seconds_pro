import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function BannerAi() {
  const { modalOpen } = useAppContext();

  return (
    <div
      className={`${
        modalOpen ? "opacity-10" : "opacity-100"
      } mx-auto sm:px-6 lg:px-0`}
    >
      <div
        data-aos="fade-up"
        className="relative isolate overflow-hidden bg-indigo-600 px-6 shadow-2xl sm:rounded-2xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
      >
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#4216c2" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Boost your productivity.
            <br />
            Start using 7Seconds Pro app today.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
            Malesuada adipiscing sagittis vel nulla.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <Link
              to="/ai"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-500 border  shadow-sm hover:bg-indigo-600 hover:text-white hover:border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          <img
            className="absolute left-0 top-10 w-[120rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            src="/dashboard.png"
            alt="App screenshot"
            width={1824}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
