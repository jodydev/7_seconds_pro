import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { HiEye, HiEyeOff } from "react-icons/hi";
import supabase from "../supabase/client";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  //! Funzione per la login utente
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log(error);
        setError(true);
        if (error.message === "Invalid login credentials") {
          setErrMessage(t("Invalid login credentials"));
        }
      } else {
        setSession(true);
        navigate("/home");
      }
    } catch (error) {
      setError(true);
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      {!session && (
        <section className="bg-gradient-to-r from-violet-600 to-indigo-600">
          {error && (
            <div className="text-center pt-10">
              <div
                className="p-3 bg-red-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3">
                  {t("Error")}
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">
                  {errMessage}
                </span>
                <IoCloseCircleOutline
                  className="cursor-pointer w-5 h-5"
                  onClick={() => setError(false)}
                />
              </div>
            </div>
          )}
          <div className="flex min-h-full flex-col items-center justify-center h-screen px-6 2xl:px-0">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
              <h2 className="text-center text-2xl 2xl:text-4xl text-nowrap font-bold leading-9 tracking-tight text-white">
                {t("Login to your account")}
              </h2>
            </div>

            <div className="bg-gray-50 shadow-sm rounded-2xl p-10 mt-10 2xl:mt-20 mx-auto w-full max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Email address")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("Password")}
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                      {showPassword ? (
                        <HiEyeOff
                          onClick={() => setShowPassword(false)}
                          className="h-5 w-5 text-gray-400"
                        />
                      ) : (
                        <HiEye
                          onClick={() => setShowPassword(true)}
                          className="h-5 w-5 text-gray-400"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t("Sign in")}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                {t("Do not have an account?")}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ms-1"
                >
                  {t("Sign up")}
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
