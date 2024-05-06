import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import supabase from "../supabase/client";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerStep, setRegisterStep] = useState(true);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      // Chiamata API a Supabase per la registrazione dell'utente
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      } else {
        setRegisterStep(false);
        setConfirmEmail(true);
      }
    } catch (error) {
      if (error.message.includes("already registered")) {
        setError(true);
      }
      console.error(error.message);
    }
  };


  return (
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
              User already registered, please try again.
            </span>
            <IoCloseCircleOutline
              className="cursor-pointer w-5 h-5"
              onClick={() => setError(false)}
            />
          </div>
        </div>
      )}

      {confirmEmail && (
        <div className="flex items-center justify-center h-screen text-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl text-gray-500 mb-6">
              Please, confirm your email to proceed to the dashboard.
            </p>
            <a
              href={`https://www.${encodeURIComponent(email.split("@")[1])}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
                <MdEmail className="inline-block w-6 h-6 me-2" />
                Confirm Email
              </button>
            </a>
          </div>
        </div>
      )}

      {registerStep && (
        <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-96 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleRegister}>
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
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(""); // Reset password error when input changes
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {passwordError && (
                    <p className="mt-1 text-red-500 text-xs">{passwordError}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Do you already have an account?
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ms-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
