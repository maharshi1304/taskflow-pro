import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {/* Profile header */}
        <div className="bg-blue-600 px-6 py-10 text-center text-white">
          <FaUserCircle className="mx-auto text-7xl" />

          <h1 className="mt-4 text-2xl font-bold">
            {user?.name || "TaskFlow User"}
          </h1>

          <p className="mt-1 text-blue-100">
            TaskFlow Pro Member
          </p>
        </div>

        {/* Profile details */}
        <div className="space-y-5 p-6 sm:p-8">
          <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Full Name
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">
              {user?.name || "TaskFlow User"}
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <FaEnvelope className="text-xl text-blue-600 dark:text-blue-400" />

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Email Address
              </p>

              <p className="truncate text-lg font-semibold text-slate-800 dark:text-white">
                {user?.email || "No email available"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/40">
            <p className="font-semibold text-green-700 dark:text-green-400">
              Account Status: Active
            </p>

            <p className="mt-1 text-sm text-green-600 dark:text-green-500">
              You are successfully logged in to TaskFlow Pro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;