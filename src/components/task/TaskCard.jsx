import { useState } from "react";
import { toast } from "react-toastify";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "../../constants/icons";

import useTask from "../../hooks/useTask";
import ConfirmModal from "../common/ConfirmModal";

import {
  formatDueDate,
  getDueDateStatus,
} from "../../utils/dateUtils";

import {
  validateTask,
  isDuplicateTaskTitle,
} from "../../utils/taskValidation";

function TaskCard({ task, index }) {
  const {
    tasks,
    editTask,
    completeTask,
    removeTask,
    processingTaskId,
  } = useTask();

  // Edit mode
  const [isEditing, setIsEditing] =
    useState(false);

  // Edit form values
  const [editTitle, setEditTitle] =
    useState(task.title);

  const [editPriority, setEditPriority] =
    useState(task.priority);

  const [editDueDate, setEditDueDate] =
    useState(task.dueDate || "");

  // Delete modal
  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  // Current task operation state
  const isProcessing =
    processingTaskId === task.id;

  // Minimum editable date
  const today =
    new Date().toISOString().split("T")[0];

  // Due-date badge status
  const dueDateStatus =
    getDueDateStatus(
      task.dueDate,
      task.status
    );

  function handleDeleteClick() {
    setShowDeleteModal(true);
  }

  function handleCancelDelete() {
    if (isProcessing) {
      return;
    }

    setShowDeleteModal(false);
  }

  async function handleConfirmDelete() {
    const result = await removeTask(
      task.id,
      task.title
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setShowDeleteModal(false);

    toast.success(
      "Task deleted successfully."
    );
  }

  async function handleCompleteTask() {
    if (task.status === "Completed") {
      return;
    }

    const result =
      await completeTask(task.id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(
      "Task completed successfully."
    );
  }

  /*
    Reusable validation aur duplicate check
    ke saath edited task save karta hai.
  */
  async function handleSaveTask() {
    const validation = validateTask({
      title: editTitle,
      priority: editPriority,
      status: task.status,
      dueDate: editDueDate,
    });

    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    const duplicateExists =
      isDuplicateTaskTitle(
        tasks,
        validation.normalizedTask.title,
        task.id
      );

    if (duplicateExists) {
      toast.warning(
        "Another task with the same title already exists."
      );

      return;
    }

    const result = await editTask(
      task.id,
      {
        title:
          validation.normalizedTask.title,

        priority:
          validation.normalizedTask.priority,

        dueDate:
          validation.normalizedTask.dueDate,
      }
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setIsEditing(false);

    toast.success(
      "Task updated successfully."
    );
  }

  function handleCancelEdit() {
    if (isProcessing) {
      return;
    }

    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || "");

    setIsEditing(false);
  }

  function handleEditClick() {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || "");

    setIsEditing(true);
  }

  function getPriorityStyle(priority) {
    if (priority === "High") {
      return `
        bg-red-100
        text-red-700
        dark:bg-red-900
        dark:text-red-300
      `;
    }

    if (priority === "Medium") {
      return `
        bg-yellow-100
        text-yellow-700
        dark:bg-yellow-900
        dark:text-yellow-300
      `;
    }

    return `
      bg-green-100
      text-green-700
      dark:bg-green-900
      dark:text-green-300
    `;
  }

  function getDueDateStatusStyle(status) {
    if (status === "Overdue") {
      return `
        bg-red-100
        text-red-700
        dark:bg-red-900
        dark:text-red-300
      `;
    }

    if (status === "Due Today") {
      return `
        bg-yellow-100
        text-yellow-700
        dark:bg-yellow-900
        dark:text-yellow-300
      `;
    }

    if (status === "Upcoming") {
      return `
        bg-green-100
        text-green-700
        dark:bg-green-900
        dark:text-green-300
      `;
    }

    if (status === "Completed") {
      return `
        bg-blue-100
        text-blue-700
        dark:bg-blue-900
        dark:text-blue-300
      `;
    }

    return `
      bg-slate-100
      text-slate-700
      dark:bg-slate-700
      dark:text-slate-300
    `;
  }

  return (
    <>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
        {/* Task header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Task #{index + 1}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityStyle(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            {/* Edit title */}
            <div>
              <label
                htmlFor={`edit-title-${task.id}`}
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Task Title
              </label>

              <input
                id={`edit-title-${task.id}`}
                type="text"
                value={editTitle}
                maxLength={80}
                disabled={isProcessing}
                onChange={(event) =>
                  setEditTitle(
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              />

              <p className="mt-2 text-right text-xs text-slate-500 dark:text-slate-400">
                {editTitle.length}/80
              </p>
            </div>

            {/* Edit priority */}
            <div>
              <label
                htmlFor={`edit-priority-${task.id}`}
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Priority
              </label>

              <select
                id={`edit-priority-${task.id}`}
                value={editPriority}
                disabled={isProcessing}
                onChange={(event) =>
                  setEditPriority(
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
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

            {/* Edit due date */}
            <div>
              <label
                htmlFor={`edit-date-${task.id}`}
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Due Date
              </label>

              <input
                id={`edit-date-${task.id}`}
                type="date"
                value={editDueDate}
                min={today}
                disabled={isProcessing}
                onChange={(event) =>
                  setEditDueDate(
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              />
            </div>

            {/* Edit buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSaveTask}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSave />

                {isProcessing
                  ? "Saving..."
                  : "Save"}
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCancelEdit}
                className="flex items-center gap-2 rounded-lg bg-slate-500 px-4 py-2 font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Task title */}
            <h2 className="mb-4 break-words text-xl font-bold text-slate-800 dark:text-white">
              {task.title}
            </h2>

            {/* Status */}
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              Status:

              <span className="ml-2 font-bold">
                {task.status === "Completed"
                  ? "✅ Completed"
                  : "🟠 Pending"}
              </span>
            </p>

            {/* Due date */}
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />

                <span>
                  Due:{" "}
                  <strong>
                    {formatDueDate(
                      task.dueDate
                    )}
                  </strong>
                </span>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getDueDateStatusStyle(
                  dueDateStatus
                )}`}
              >
                {dueDateStatus}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={
                  task.status ===
                    "Completed" ||
                  isProcessing
                }
                onClick={handleCompleteTask}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaCheckCircle />

                {isProcessing
                  ? "Processing..."
                  : task.status ===
                    "Completed"
                  ? "Completed"
                  : "Complete"}
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleEditClick}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaEdit />
                Edit
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleDeleteClick}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </>
        )}
      </article>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText={
          isProcessing
            ? "Deleting..."
            : "Delete"
        }
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default TaskCard;