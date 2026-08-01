import {
  useEffect,
  useState,
} from "react";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaSyncAlt,
  FaCalendarDay,
  FaExclamationTriangle,
  FaCalendarCheck,
  FaFileCsv,
} from "react-icons/fa";

import { toast } from "react-toastify";

import useTask from "../hooks/useTask";
import useDebounce from "../hooks/useDebounce";

import StatsCard from "../components/dashboard/StatsCard";
import TaskProgress from "../components/dashboard/TaskProgress";
import TaskCharts from "../components/dashboard/TaskCharts";

import TaskForm from "../components/task/TaskForm";
import TaskFilter from "../components/task/TaskFilter";
import TaskCard from "../components/task/TaskCard";
import ImportTasks from "../components/task/ImportTasks";

import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import Pagination from "../components/common/Pagination";

import filterTasks from "../utils/filterTasks";

import {
  isOverdue,
  isDueToday,
  isUpcoming,
} from "../utils/dateUtils";

import {
  exportTasksToCsv,
} from "../utils/exportTasks";

function Dashboard() {
  const [currentPage, setCurrentPage] =
    useState(1);

  const tasksPerPage = 6;

  const {
    tasks,
    search,
    statusFilter,
    priorityFilter,
    sortOrder,
    isLoading,
    taskError,
    refreshTasks,
  } = useTask();

  /*
    Search filtering typing stop hone ke
    400 milliseconds baad apply hogi.
  */
  const debouncedSearch = useDebounce(
    search,
    400
  );

  const isSearchPending =
    search !== debouncedSearch;

  /*
    Search, filters aur sorting ke baad
    final task list.
  */
  const filteredTasks = filterTasks(
    tasks,
    debouncedSearch,
    statusFilter,
    priorityFilter,
    sortOrder
  );

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  const firstTaskIndex =
    (currentPage - 1) * tasksPerPage;

  const lastTaskIndex =
    firstTaskIndex + tasksPerPage;

  const paginatedTasks = filteredTasks.slice(
    firstTaskIndex,
    lastTaskIndex
  );

  /*
    Search, filter ya sorting change hone par
    first page open hogi.
  */
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    statusFilter,
    priorityFilter,
    sortOrder,
  ]);

  /*
    Task delete hone ke baad invalid current
    page ko last available page par set karta hai.
  */
  useEffect(() => {
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // Basic statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  // Priority statistics
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  // Due-date statistics
  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      isOverdue(task.dueDate)
  ).length;

  const dueTodayTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      isDueToday(task.dueDate)
  ).length;

  const upcomingTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      isUpcoming(task.dueDate)
  ).length;

  // Export every task
  function handleExportAllTasks() {
    const result = exportTasksToCsv(
      tasks,
      "taskflow-all-tasks.csv"
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(
      "All tasks exported successfully."
    );
  }

  /*
    Export all filtered tasks,
    not only current page tasks.
  */
  function handleExportFilteredTasks() {
    const result = exportTasksToCsv(
      filteredTasks,
      "taskflow-filtered-tasks.csv"
    );

    if (!result.success) {
      toast.error(
        "No filtered tasks available to export."
      );

      return;
    }

    toast.success(
      "Filtered tasks exported successfully."
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard heading and actions */}
      <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage, monitor and track your tasks easily.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ImportTasks />

          <button
            type="button"
            onClick={handleExportAllTasks}
            disabled={
              isLoading ||
              tasks.length === 0
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaFileCsv />
            Export All
          </button>

          <button
            type="button"
            onClick={handleExportFilteredTasks}
            disabled={
              isLoading ||
              filteredTasks.length === 0
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-600 dark:hover:bg-slate-500"
          >
            <FaFileCsv />
            Export Filtered
          </button>

          <button
            type="button"
            onClick={refreshTasks}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt
              className={
                isLoading
                  ? "animate-spin"
                  : ""
              }
            />

            {isLoading
              ? "Refreshing..."
              : "Refresh Tasks"}
          </button>
        </div>
      </header>

      {/* Statistics */}
      <section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            color="blue"
            icon={<FaTasks size={25} />}
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
            color="green"
            icon={<FaCheckCircle size={25} />}
          />

          <StatsCard
            title="Pending"
            value={pendingTasks}
            color="yellow"
            icon={<FaClock size={25} />}
          />

          <StatsCard
            title="High Priority"
            value={highPriorityTasks}
            color="red"
            icon={<FaArrowUp size={25} />}
          />

          <StatsCard
            title="Medium Priority"
            value={mediumPriorityTasks}
            color="orange"
            icon={<FaArrowDown size={25} />}
          />

          <StatsCard
            title="Low Priority"
            value={lowPriorityTasks}
            color="green"
            icon={<FaArrowDown size={25} />}
          />

          <StatsCard
            title="Overdue"
            value={overdueTasks}
            color="red"
            icon={
              <FaExclamationTriangle size={25} />
            }
          />

          <StatsCard
            title="Due Today"
            value={dueTodayTasks}
            color="yellow"
            icon={<FaCalendarDay size={25} />}
          />

          <StatsCard
            title="Upcoming"
            value={upcomingTasks}
            color="blue"
            icon={<FaCalendarCheck size={25} />}
          />
        </div>
      </section>

      <TaskProgress />

      <TaskCharts />

      <TaskForm />

      <TaskFilter />

      {/* Task list */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            All Tasks ({filteredTasks.length})
          </h2>

          {isSearchPending && (
            <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
              Searching...
            </p>
          )}

          {!isSearchPending &&
            filteredTasks.length > 0 && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                {firstTaskIndex + 1}-
                {Math.min(
                  lastTaskIndex,
                  filteredTasks.length
                )}{" "}
                of {filteredTasks.length} tasks
              </p>
            )}
        </div>

        {isLoading ? (
          <LoadingSpinner message="Loading tasks..." />
        ) : taskError ? (
          <ErrorState
            message={taskError}
            onRetry={refreshTasks}
          />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title={
              tasks.length === 0
                ? "No tasks yet"
                : "No matching tasks found"
            }
            message={
              tasks.length === 0
                ? "Create your first task using the form above."
                : "Try changing your search text or filter options."
            }
          />
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedTasks.map(
                (task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={
                      firstTaskIndex + index
                    }
                  />
                )
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;