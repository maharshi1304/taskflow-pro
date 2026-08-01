import useTask from "../../hooks/useTask";

function ApiStatus() {
  const {
    apiStatus,
    refreshTasks,
    isLoading,
  } = useTask();

  const statusConfig = {
    checking: {
      label: "Checking API",
      dotClass: "bg-yellow-500 animate-pulse",
      containerClass:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300",
    },

    online: {
      label: "API Online",
      dotClass: "bg-green-500",
      containerClass:
        "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300",
    },

    offline: {
      label: "API Offline",
      dotClass: "bg-red-500",
      containerClass:
        "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    },
  };

  const currentStatus =
    statusConfig[apiStatus] || statusConfig.checking;

  return (
    <button
      type="button"
      onClick={refreshTasks}
      disabled={isLoading}
      title="Click to check API connection"
      className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition hover:opacity-80 disabled:cursor-wait ${currentStatus.containerClass}`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${currentStatus.dotClass}`}
      />

      <span className="hidden md:inline">
        {currentStatus.label}
      </span>
    </button>
  );
}

export default ApiStatus;