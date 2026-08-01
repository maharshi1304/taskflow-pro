// import { Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import { MdDashboard } from "../../constants/icons";

// import ThemeToggle from "../theme/ThemeToggle";

// function Navbar({ setSidebarOpen }) {
//   return (
//     <header className="z-50 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
//       {/* Left side */}
//       <div className="flex items-center gap-3">
//   {/* Mobile Menu */}
//   <button
//     type="button"
//     onClick={() => setSidebarOpen(true)}
//     className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 lg:hidden"
//   >
//     <FaBars size={22} />
//   </button>

//   {/* Logo */}
//   <Link
//     to="/"
//     className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
//   >
//     <MdDashboard size={30} className="text-blue-600 dark:text-blue-400"/>

//     <h1 className="text-xl font-bold text-slate-800 dark:text-white">
//       TaskFlow Pro
//     </h1>
//   </Link>
// </div>

//       {/* Right side */}
//       <ThemeToggle />
//     </header>
//   );
// }

// export default Navbar;







// {/* <div className="flex items-center gap-3">
//         {/* Mobile menu button */}
//         <button
//           type="button"
//           onClick={() => setSidebarOpen(true)}
//           aria-label="Open navigation menu"
//           className="flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 lg:hidden"
//         >
//           <FaBars size={22} />
//         </button>

//         {/* App title */}
//        <Link
//   to="/"
//   className="transition-transform duration-200 hover:scale-105"
// >
//   <h1 className="text-xl font-bold text-slate-800 dark:text-white sm:text-2xl">
//     TaskFlow Pro
//   </h1>
// </Link>
//       </div> 
//        */}


import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { MdDashboard } from "../../constants/icons";

import ThemeToggle from "../theme/ThemeToggle";
import ApiStatus from "../common/ApiStatus";
import TaskNotifications from "../common/TaskNotifications";

import { useAuth } from "../../context/AuthContext";

import { toast } from "react-toastify";

function Navbar({ setSidebarOpen }) {
  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    toast.success("Logout successful.");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 lg:hidden"
        >
          <FaBars size={21} />
        </button>

        {/* Clickable application logo */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <MdDashboard
            size={28}
            className="shrink-0 text-blue-600 dark:text-blue-400"
          />

          <h1 className="truncate text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            TaskFlow Pro
          </h1>
        </Link>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* API connection status */}
        <ApiStatus />

        {/* Task notification bell */}
        <TaskNotifications />

        {/* Theme switch */}
        <ThemeToggle />

        {isAuthenticated && (
          <>
            {/* User information */}
            <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-700 xl:flex">
              <FaUserCircle className="text-2xl text-blue-600 dark:text-blue-400" />

              <div className="max-w-40 leading-tight">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                  {user?.name || "TaskFlow User"}
                </p>

                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 p-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-3"
            >
              <FaSignOutAlt />

              <span className="hidden md:inline">
                Logout
              </span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;