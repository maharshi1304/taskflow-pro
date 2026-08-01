// function Login() {
//     return (
//         <div>
//             <h1>Login Page</h1>
//         </div>
//     );
// }

// export default Login;


import {useState,} from "react";

import { Navigate, useLocation, useNavigate,} from "react-router-dom";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("admin@taskflow.com");

  const [password, setPassword] = useState("123456");

  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    location.state?.from || "/dashboard";

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error(
        "Please enter email and password."
      );

      return;
    }

    const result = login(email.trim(), password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Login successful.");

    navigate(redirectPath, {replace: true,});
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            TaskFlow Pro
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to manage your tasks
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (currentValue) =>
                      !currentValue
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <p>
            <span className="font-semibold">
              Email:
            </span>{" "}
            admin@taskflow.com
          </p>

          <p className="mt-1">
            <span className="font-semibold">
              Password:
            </span>{" "}
            123456
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
