import { FaTasks } from "../../constants/icons";

function EmptyState({
  title = "No tasks found",
  message = "Create your first task to get started.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
        <FaTasks className="text-3xl text-blue-600 dark:text-blue-400" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;