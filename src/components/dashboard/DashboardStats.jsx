import useTask from "../../hooks/useTask";
import StatsCard from "./StatsCard";

import {
  FaTasks,
  FaCheckCircle,
  MdPriorityHigh,
} from "../../constants/icons";

function DashboardStats() {
  const { tasks } = useTask();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Tasks"
        value={totalTasks}
        color="bg-blue-600"
        icon={<FaTasks />}
      />

      <StatsCard
        title="Completed"
        value={completedTasks}
        color="bg-green-600"
        icon={<FaCheckCircle />}
      />

      <StatsCard
        title="Pending"
        value={pendingTasks}
        color="bg-yellow-500"
        icon={<FaTasks />}
      />

      <StatsCard
        title="High Priority"
        value={highPriorityTasks}
        color="bg-red-600"
        icon={<MdPriorityHigh />}
      />

    </div>
  );
}

export default DashboardStats;