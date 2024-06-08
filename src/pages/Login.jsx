import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

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
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [registerStep, setRegisterStep] = useState(true);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  //! Funzione per la login utente
  const handleLogin = async (event) => {
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

  //! Funzione per la registrazione utente
  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({ email, password });

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

      if (!passwordRegex.test(password)) {
        setError(false);
        setPasswordError(
          t(
            "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
          )
        );
      }

      if (error) {
        console.log(error);

        if (
          error.message ===
          "A user with this email address has already been registered"
        ) {
          setErrMessage(t("User already registered, please try again."));
          setError(true);
        } else if (error.message === "Error sending confirmation mail") {
          setErrMessage(
            t("Error sending confirmation mail, please try again.")
          );
          setError(true);
        }
      } else {
        setRegisterStep(false);
        setConfirmEmail(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //! Funzione per il reset della password
  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);

      if (error) {
        console.error("Error resetting password:", error.message);
        setError(true);
        setErrMessage(t("Failed to send reset email, try again"));
      } else {
        setError(false);
        setResetSuccess(true);
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      setError(true);
      setErrMessage(t("Failed to send reset email, try again"));
    }
  };

  //! Funzione per prevenire l'azione del tasto Enter negli input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const signUppButton = document.getElementById("signUpp");
    const signInnButton = document.getElementById("signInn");
    const container = document.getElementById("container");

    if (
      signUpButton &&
      signInButton &&
      container &&
      signUppButton &&
      signInnButton
    ) {
      const handleSignUpClick = () => {
        container.classList.add("right-panel-active");
      };

      const handleSignInClick = () => {
        container.classList.remove("right-panel-active");
      };

      signUpButton.addEventListener("click", handleSignUpClick);
      signInButton.addEventListener("click", handleSignInClick);
      signUppButton.addEventListener("click", handleSignUpClick);
      signInnButton.addEventListener("click", handleSignInClick);

      return () => {
        signUpButton.removeEventListener("click", handleSignUpClick);
        signInButton.removeEventListener("click", handleSignInClick);
        signUppButton.removeEventListener("click", handleSignUpClick);
        signInnButton.removeEventListener("click", handleSignInClick);
      };
    } else {
      console.log("Elements not found:", {
        signUpButton,
        signInButton,
        container,
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {error && (
        <div className="text-center absolute right-0 left-0 px-5 md:px-0 top-16 md:top-20">
          <div
            className="p-4 bg-red-500 items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3">
              {t("Error")}
            </span>
            <span className="text-sm sm:text-base font-semibold mr-2 text-left flex-auto">
              {errMessage}
            </span>
            <IoCloseCircleOutline
              className="cursor-pointer w-5 h-5"
              onClick={() => setError(false)}
            />
          </div>
        </div>
      )}
      {resetSuccess && (
        <div className="text-center absolute right-0 left-0 px-5 md:px-0 top-16 md:top-20">
          <div
            className="p-3 bg-green-500 items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-green-600 uppercase px-2 py-1 text-xs font-bold mr-3">
              {t("Success")}
            </span>
            <span className="text-sm sm:text-base font-semibold mr-2 text-left flex-auto">
              {t("Reset email sent, please check your inbox")}
            </span>
            <IoCloseCircleOutline
              className="cursor-pointer w-5 h-5"
              onClick={() => setResetSuccess(false)}
            />
          </div>
        </div>
      )}
      {confirmEmail && (
        <div className="flex-col items-center justify-center text-center bg-white">
          <img
            src="/email.gif"
            alt="Email"
            className="mx-auto h-[300px] w-[300px] text-gray-400"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl  text-gray-500 font-semibold my-6">
              {t("Please, confirm your email to proceed to the dashboard")}
            </p>
            <a
              href={`https://www.${encodeURIComponent(email.split("@")[1])}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500 mt-5 font-semibold"
            >
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
                <MdEmail className="inline-block w-6 h-6 me-2" />
                {t("Confirm Email")}
              </button>
            </a>
          </div>
        </div>
      )}
      {showReset && (
        <form className="w-full md:w-3/5" onSubmit={handleResetPassword}>
          <h2 className="text-2xl md:text-4xl 2xl:text-6xl my-5 font-bold">
            {t("Enter your email to proceed with resetting your password")}
          </h2>
          <div className="w-3/4 md:w-3/6 mt-10">
            <input
              id="resetEmail"
              name="resetEmail"
              autoComplete="email"
              required
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="my-5 w-full flex items-center justify-center">
              <button
                type="submit"
                className="mt-10 flex md:w-3/4 2xl:w-3/6 justify-center rounded-full bg-indigo-600 px-3 py-3 text-lg md:text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Send reset email")}
              </button>
            </div>
          </div>
        </form>
      )}
      {registerStep && !showReset && (
        <div
          className="container w-[85%] md:w-[70%] h-[80%] md:h-[600px] 2xl:h-[800px]"
          id="container"
        >
          <div className="form-container sign-up-container w-full md:w-1/2">
            <form onSubmit={handleRegister}>
              <h2 className="text-3xl md:text-5xl 2xl:text-7xl font-bold my-8">
                {t("Create account")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6  w-full md:w-3/4 2xl:w-3/6">
                <div className="col-span-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900 text-start"
                  >
                    {t("First Name")}
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900 text-start"
                  >
                    {t("Last Name")}
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-2 w-full md:w-3/4 2xl:w-3/6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 text-start"
                >
                  {t("Email address")}
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2 w-full md:w-3/4 2xl:w-3/6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-900 text-start font-semibold"
                >
                  {t("Password")}
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center cursor-pointer">
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
              {passwordError && (
                <div className="w-full md:w-3/6">
                  <p className="text-red-500 text-xs text-start">
                    {passwordError}
                  </p>
                </div>
              )}
              <div className="my-5 w-full md:w-3/4 2xl:w-3/6">
                <label
                  htmlFor="profilePhoto"
                  className="block text-sm font-medium leading-6 text-gray-900 text-start"
                >
                  {t("Profile Photo")}
                </label>
                <input
                  name="profilePhoto"
                  type="file"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                />
              </div>
              <p className="block md:hidden text-center text-xs text-gray-500">
                {t("If you already have an account")}
                <button
                  id="signIn"
                  type="button"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ms-1"
                >
                  {t("Sign in")}
                </button>
              </p>
              <button
                type="submit"
                className="my-5 flex w-3/6 justify-center rounded-full bg-indigo-600 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Register")}
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container w-full md:w-1/2">
            <form onSubmit={handleLogin}>
              <h1 className="text-4xl md:text-5xl 2xl:text-7xl font-bold my-5">
                {t("Sign in")}
              </h1>
              <div className="mt-5 md:mt-10 w-full md:w-3/4 2xl:w-3/6">
                <label
                  htmlFor="email"
                  className="block text-sm leading-6 text-gray-900 text-start font-semibold"
                >
                  {t("Email address")}
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2 w-full md:w-3/4 2xl:w-3/6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-gray-900 text-start"
                >
                  {t("Password")}
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center cursor-pointer">
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

              {/* FORGOT PASSWORD */}
              <p className="md:my-5 2xl:mt-10 text-center text-xs 2xl:text-sm text-gray-500">
                {t("Forgot your password?")}
                <button
                  onClick={() => setShowReset(true)}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ms-1"
                >
                  {t("Click here")}
                </button>
              </p>
              <p className="block md:hidden text-center text-xs text-gray-500">
                {t("or if you dont'have account")}
                <button
                  id="signUp"
                  type="button"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ms-1"
                >
                  {t("Sign up")}
                </button>
              </p>

              <button
                type="submit"
                className="my-3 flex w-3/6 justify-center rounded-full bg-indigo-600 px-3 py-2 text-base 2xl:text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Sign in")}
              </button>
              <p className="text-center text-xs text-gray-500">
                {t("oppure")}
              </p>
              <button className="button rounded-full my-3">
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#ffffff"
                      d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                    ></path>
                  </g>
                </svg>
                Continue with LinkedIn
              </button>
            </form>
          </div>
          <div className="overlay-container hidden md:block">
            <div className="overlay bg-indigo-600">
              <div className="overlay-panel overlay-left">
                <h2 className="md:text-5xl 2xl:text-7xl my-5 text-white font-bold">
                  {t("Welcome Back!")}
                </h2>
                <p className="my-10 md-text-base 2xl:text-lg">
                  {t("To access your personal dashboard, first log in")}
                </p>
                <button
                  id="signInn"
                  type="button"
                  className="flex w-3/6 justify-center rounded-full bg-white px-3 py-3 text-xl font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("Sign in")}
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2 className="md:text-4xl 2xl:text-5xl text-white font-bold">
                  {t("Hi, welcome to")}
                </h2>
                <h2 className="text-5xl text-white font-bold mt-2">
                  {t("7Seconds Pro")}
                </h2>
                <p className="mt-10 md:text-base 2xl:text-lg">
                  {t("Do not have an account? Create now")}
                </p>
                <button
                  id="signUpp"
                  type="button"
                  className="mt-10 flex w-3/6 justify-center rounded-full bg-white px-3 py-3 text-xl font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("Sign up")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
