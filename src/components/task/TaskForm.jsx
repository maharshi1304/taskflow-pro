
import { useState } from "react";
import { toast } from "react-toastify";

import useTask from "../../hooks/useTask";

import {
  validateTask,
  isDuplicateTaskTitle,
} from "../../utils/taskValidation";

function TaskForm() {
  /*
    Existing tasks duplicate-title check
    ke liye required hain.
  */
  const {
    tasks,
    addTask,
  } = useTask();

  const [title, setTitle] = useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /*
    User ko past date select karne se rokta hai.
  */
  const today =
    new Date().toISOString().split("T")[0];

  async function handleSubmit(event) {
    event.preventDefault();

    /*
      Reusable utility ke through
      form values validate karte hain.
    */
    const validation = validateTask({
      title,
      priority,
      status: "Pending",
      dueDate,
    });

    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    /*
      Same task title already exist karta ho
      to new duplicate task create nahi hoga.
    */
    const duplicateExists =
      isDuplicateTaskTitle(
        tasks,
        validation.normalizedTask.title
      );

    if (duplicateExists) {
      toast.warning(
        "A task with the same title already exists."
      );

      return;
    }

    const newTask = {
      ...validation.normalizedTask,
    };

    try {
      setIsSubmitting(true);

      const result = await addTask(newTask);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        "Task added successfully."
      );

      // Reset form after successful creation
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
        Add New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Task title */}
        <div>
          <label
            htmlFor="task-title"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Task Title
          </label>

          <input
            id="task-title"
            type="text"
            value={title}
            maxLength={80}
            placeholder="Enter task title"
            disabled={isSubmitting}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Minimum 3 and maximum 80 characters.
            </p>

            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {title.length}/80
            </p>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="task-priority"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Priority
          </label>

          <select
            id="task-priority"
            value={priority}
            disabled={isSubmitting}
            onChange={(event) =>
              setPriority(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>
        </div>

        {/* Due date */}
        <div>
          <label
            htmlFor="task-due-date"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Due Date
          </label>

          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            min={today}
            disabled={isSubmitting}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Adding Task..."
            : "Add Task"}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;