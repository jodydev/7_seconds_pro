import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
  
      if (!passwordRegex.test(password)) {
        setPasswordError(
          t(
            "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
          )
        );
        return;
      }
  
      if (password === "" || confirmPassword === "") {
        return;
      }
  
      if (password !== confirmPassword) {
        setError(true);
        setErrorMessage(t("Passwords do not match"));
        return;
      }
  
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
  
      if (error) {
        if (error.status === 422) {
          setError(true);
          setErrorMessage(
            t("The new password must be different from the previous one")
          );
        } else if (error.status === 500) {
          setError(true);
          setErrorMessage(t("Internal server error, please try again later"));
        }
      } else {
        setMessage(true);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };
  

  return (
    <section className="bg-gradient-to-r from-violet-600 to-indigo-600">
      {error && (
        <div className="text-center absolute right-0 left-0 top-10">
          <div
            className="p-3 bg-red-500 items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
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
      {message && (
        <div className="text-center absolute right-0 left-0 top-10">
          <div
            className="p-3 bg-green-500 items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-green-600 uppercase px-2 py-1 text-xs font-bold mr-3">
              {t("Success")}
            </span>
            <span className="text-sm sm:text-base font-semibold mr-2 text-left flex-auto">
              {t("Password updated successfully, you can now log in")}
            </span>
            <IoCloseCircleOutline
              className="cursor-pointer w-5 h-5"
              onClick={() => setResetSuccess(false)}
            />
          </div>
        </div>
      )}
      <div className="flex min-h-full flex-col py-40  h-screen px-6 2xl:px-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="text-center text-2xl 2xl:text-4xl text-nowrap font-bold leading-9 tracking-tight text-white">
            {t("Reset your password")}
          </h2>
        </div>

        <div className="bg-gray-50 shadow-sm rounded-2xl p-10 mt-10 2xl:mt-20 mx-auto w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("New Password")}
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("Confirm Password")}
              </label>
              <div className="mt-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {passwordError && (
              <p className="mt-1 text-red-500 text-xs">{passwordError}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Confirm")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
