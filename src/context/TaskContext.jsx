import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export const TaskContext = createContext(null);

function TaskProvider({ children }) {
  // Tasks received from JSON Server
  const [tasks, setTasks] = useState([]);

  // Search, filters and sorting
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [priorityFilter, setPriorityFilter] =
    useState("All");
  const [sortOrder, setSortOrder] =
    useState("A-Z");

  // General API states
  const [isLoading, setIsLoading] =
    useState(true);

  const [taskError, setTaskError] =
    useState("");

  /*
    API status values:

    checking
    online
    offline
  */
  const [apiStatus, setApiStatus] =
    useState("checking");

  /*
    Stores the ID of the task currently
    being edited, completed or deleted.
  */
  const [processingTaskId, setProcessingTaskId] =
    useState(null);

  /*
    GET: Fetch all tasks from JSON Server.
  */
  async function refreshTasks() {
    try {
      setIsLoading(true);
      setTaskError("");
      setApiStatus("checking");

      const taskData = await getTasks();

      setTasks(taskData);
      setApiStatus("online");
    } catch (error) {
      console.error(
        "Unable to fetch tasks:",
        error
      );

      setTaskError(
        "Unable to load tasks. Please check whether JSON Server is running."
      );

      setApiStatus("offline");
    } finally {
      setIsLoading(false);
    }
  }

  /*
    POST: Create one new task.
  */
  async function addTask(taskData) {
    try {
      setTaskError("");
      setApiStatus("checking");

      const createdTask =
        await createTask(taskData);

      setTasks((previousTasks) => [
        ...previousTasks,
        createdTask,
      ]);

      setApiStatus("online");

      return {
        success: true,
        task: createdTask,
      };
    } catch (error) {
      console.error(
        "Unable to add task:",
        error
      );

      setApiStatus("offline");

      return {
        success: false,
        message:
          "Unable to add task. Please check whether JSON Server is running.",
      };
    }
  }

  /*
    POST: Import multiple tasks from CSV.
  */
  async function importTasks(importedTasks) {
    const createdTasks = [];
    const failedTasks = [];

    if (
      !Array.isArray(importedTasks) ||
      importedTasks.length === 0
    ) {
      return {
        success: false,
        createdCount: 0,
        failedCount: 0,
        message: "No tasks available to import.",
      };
    }

    try {
      setApiStatus("checking");

      for (const taskData of importedTasks) {
        try {
          const createdTask =
            await createTask(taskData);

          createdTasks.push(createdTask);
        } catch (error) {
          console.error(
            `Unable to import task: ${taskData.title}`,
            error
          );

          failedTasks.push(taskData);
        }
      }

      if (createdTasks.length > 0) {
        setTasks((previousTasks) => [
          ...previousTasks,
          ...createdTasks,
        ]);
      }

      setApiStatus(
        failedTasks.length === importedTasks.length
          ? "offline"
          : "online"
      );

      return {
        success: createdTasks.length > 0,
        createdCount: createdTasks.length,
        failedCount: failedTasks.length,
        message:
          createdTasks.length > 0
            ? ""
            : "Unable to import tasks. Please check JSON Server.",
      };
    } catch (error) {
      console.error(
        "Unable to import tasks:",
        error
      );

      setApiStatus("offline");

      return {
        success: false,
        createdCount: 0,
        failedCount: importedTasks.length,
        message:
          "Unable to import tasks. Please check JSON Server.",
      };
    }
  }

  /*
    PATCH: Edit task details.
  */
  async function editTask(
    taskId,
    updatedFields
  ) {
    try {
      setProcessingTaskId(taskId);
      setApiStatus("checking");

      const updatedTask = await updateTask(
        taskId,
        updatedFields
      );

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      );

      setApiStatus("online");

      return {
        success: true,
        task: updatedTask,
      };
    } catch (error) {
      console.error(
        "Unable to update task:",
        error
      );

      setApiStatus("offline");

      return {
        success: false,
        message:
          "Unable to update task. Please check JSON Server.",
      };
    } finally {
      setProcessingTaskId(null);
    }
  }

  /*
    PATCH: Mark task as Completed.
  */
  async function completeTask(taskId) {
    try {
      setProcessingTaskId(taskId);
      setApiStatus("checking");

      const updatedTask = await updateTask(
        taskId,
        {
          status: "Completed",
        }
      );

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      );

      setApiStatus("online");

      return {
        success: true,
        task: updatedTask,
      };
    } catch (error) {
      console.error(
        "Unable to complete task:",
        error
      );

      setApiStatus("offline");

      return {
        success: false,
        message:
          "Unable to complete task. Please check JSON Server.",
      };
    } finally {
      setProcessingTaskId(null);
    }
  }

  /*
    DELETE: Remove task from JSON Server.
  */
  async function removeTask(
    taskId,
    taskTitle
  ) {
    try {
      setProcessingTaskId(taskId);
      setApiStatus("checking");

      await deleteTask(taskId);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task.id !== taskId
        )
      );

      setApiStatus("online");

      return {
        success: true,
        deletedTaskTitle: taskTitle,
      };
    } catch (error) {
      console.error(
        "Unable to delete task:",
        error
      );

      setApiStatus("offline");

      return {
        success: false,
        message:
          "Unable to delete task. Please check JSON Server.",
      };
    } finally {
      setProcessingTaskId(null);
    }
  }

  /*
    Fetch tasks when application starts.
  */
  useEffect(() => {
    refreshTasks();
  }, []);

  const contextValue = {
    // Tasks
    tasks,
    setTasks,

    // Task API operations
    addTask,
    importTasks,
    editTask,
    completeTask,
    removeTask,
    refreshTasks,

    // API states
    isLoading,
    taskError,
    apiStatus,
    processingTaskId,

    // Search
    search,
    setSearch,

    // Status filter
    statusFilter,
    setStatusFilter,

    // Priority filter
    priorityFilter,
    setPriorityFilter,

    // Sorting
    sortOrder,
    setSortOrder,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;