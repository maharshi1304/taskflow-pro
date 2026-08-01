// function Home() {
//     return (
//         <div>
//             <h1>Home Page</h1>
//             <p>Welcome to TaskFlow Pro</p>
//         </div>
//     );
// }

// export default Home;

import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaTasks,
} from "react-icons/fa";

import useTask from "../hooks/useTask";

function Home() {
  const { tasks, isLoading } = useTask();

  /*
    Home page par basic live statistics
    Dashboard ke task data se calculate hongi.
  */
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14 lg:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            Organize. Focus. Complete.
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Manage your daily work with TaskFlow Pro
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Create tasks, track deadlines, manage priorities
            and monitor your progress from one simple and
            responsive dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Open Dashboard
              <FaArrowRight />
            </Link>

            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Live task overview */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Your Task Overview
          </h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            A quick summary of your current task progress.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total tasks */}
          <article className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-blue-900 dark:bg-blue-950/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                  Total Tasks
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {isLoading ? "..." : totalTasks}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <FaTasks size={22} />
              </div>
            </div>
          </article>

          {/* Completed tasks */}
          <article className="rounded-2xl border border-green-100 bg-green-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-green-900 dark:bg-green-950/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-300">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {isLoading ? "..." : completedTasks}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                <FaCheckCircle size={22} />
              </div>
            </div>
          </article>

          {/* Pending tasks */}
          <article className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-yellow-900 dark:bg-yellow-950/40 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {isLoading ? "..." : pendingTasks}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-white">
                <FaClock size={22} />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Feature section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Everything you need to stay productive
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
            TaskFlow Pro keeps your task management simple
            while still providing useful professional features.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-700/60">
            <h3 className="font-bold text-slate-800 dark:text-white">
              Smart Task Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Add, edit, complete and delete tasks with
              permanent API storage.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-700/60">
            <h3 className="font-bold text-slate-800 dark:text-white">
              Deadlines and Notifications
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Track overdue, due-today and upcoming tasks
              from your dashboard.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-700/60">
            <h3 className="font-bold text-slate-800 dark:text-white">
              Import and Export
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Import tasks from CSV and export complete or
              filtered task reports.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;