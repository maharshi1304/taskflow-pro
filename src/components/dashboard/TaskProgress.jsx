import useTask from "../../hooks/useTask";

function TaskProgress() {
  const { tasks } = useTask();

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const totalTasks = tasks.length;

  const progressPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Task Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your overall task completion.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>

      {/* Progress information */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          {completedTasks} of {totalTasks} tasks completed
        </p>

        <p className="text-slate-500 dark:text-slate-400">
          {totalTasks - completedTasks} remaining
        </p>
      </div>
    </div>
  );
}

export default TaskProgress;