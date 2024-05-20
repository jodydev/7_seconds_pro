import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import supabase from "../supabase/client";

export default function Login() {
  const navigate = useNavigate();
  const [session, setSession] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  //! Funzione per il login di un utente esistente
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    setSession(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (error) {
      setError(true);
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      {!session && (
        <>
          {error && (
            <div className="text-center mt-10">
              <div
                className="p-3 bg-red-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3">
                  Error
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">
                  Invalid credentials or user does not exist, please try again.
                </span>
                <IoCloseCircleOutline
                  className="cursor-pointer w-5 h-5"
                  onClick={() => setError(false)}
                />
              </div>
            </div>
          )}
          <div className="flex min-h-full flex-1 flex-col items-center justify-center py-32 2xl:py-96">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
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
                    Password
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
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Do not have an account?
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ms-1"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
