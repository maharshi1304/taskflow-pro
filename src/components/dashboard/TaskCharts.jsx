import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

import useTask from "../../hooks/useTask";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function TaskCharts() {
  const { tasks } = useTask();

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const statusData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completedTasks, pendingTasks],
        backgroundColor: [
          "rgba(34, 197, 94, 0.75)",
          "rgba(249, 115, 22, 0.75)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const priorityData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [
          highPriorityTasks,
          mediumPriorityTasks,
          lowPriorityTasks,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.75)",
          "rgba(234, 179, 8, 0.75)",
          "rgba(34, 197, 94, 0.75)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Task Analytics
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Add tasks to view dashboard charts.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {/* Status chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Task Status
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Completed and pending task overview.
          </p>
        </div>

        <div className="mt-6 h-72">
          <Doughnut
            data={statusData}
            options={doughnutOptions}
          />
        </div>
      </div>

      {/* Priority chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Priority Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tasks grouped by priority.
          </p>
        </div>

        <div className="mt-6 h-72">
          <Bar
            data={priorityData}
            options={barOptions}
          />
        </div>
      </div>
    </section>
  );
}

export default TaskCharts;