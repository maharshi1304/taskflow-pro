import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import useTask from "../../hooks/useTask";

import {
  formatDueDate,
  isDueToday,
  isOverdue,
} from "../../utils/dateUtils";

function TaskNotifications() {
  const { tasks } = useTask();

  const navigate = useNavigate();

  const notificationRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  /*
    Completed tasks ko notifications me include nahi karte.
  */
  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      isOverdue(task.dueDate)
  );

  const dueTodayTasks = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      isDueToday(task.dueDate)
  );

  const totalNotifications =
    overdueTasks.length + dueTodayTasks.length;

  /*
    Dropdown ke outside click karne par
    notification panel close hota hai.
  */
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
    Notification item click hone par
    Dashboard open hota hai.
  */
  function handleNotificationClick() {
    setIsOpen(false);

    navigate("/dashboard");
  }

  return (
    <div
      ref={notificationRef}
      className="relative"
    >
      {/* Notification button */}
      <button
        type="button"
        onClick={() =>
          setIsOpen((currentValue) => !currentValue)
        }
        aria-label="Task notifications"
        aria-expanded={isOpen}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
      >
        <FaBell size={19} />

        {totalNotifications > 0 && (
          <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {totalNotifications > 99
              ? "99+"
              : totalNotifications}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-[70] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          {/* Dropdown heading */}
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold text-slate-800 dark:text-white">
                Task Notifications
              </h2>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                {totalNotifications}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Tasks that need your attention.
            </p>
          </div>

          {/* Notification list */}
          <div className="max-h-96 overflow-y-auto p-3">
            {totalNotifications === 0 ? (
              <div className="px-4 py-10 text-center">
                <div className="text-4xl">
                  ✅
                </div>

                <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
                  You are all caught up
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  No overdue or due-today tasks.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Overdue notifications */}
                {overdueTasks.length > 0 && (
                  <section>
                    <h3 className="px-2 text-xs font-bold uppercase tracking-wide text-red-600 dark:text-red-400">
                      Overdue ({overdueTasks.length})
                    </h3>

                    <div className="mt-2 space-y-2">
                      {overdueTasks.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={handleNotificationClick}
                          className="w-full rounded-xl border border-red-100 bg-red-50 p-3 text-left transition hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:hover:bg-red-950/70"
                        >
                          <p className="break-words text-sm font-semibold text-slate-800 dark:text-white">
                            {task.title}
                          </p>

                          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                            Due: {formatDueDate(task.dueDate)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Due-today notifications */}
                {dueTodayTasks.length > 0 && (
                  <section>
                    <h3 className="px-2 text-xs font-bold uppercase tracking-wide text-yellow-600 dark:text-yellow-400">
                      Due Today ({dueTodayTasks.length})
                    </h3>

                    <div className="mt-2 space-y-2">
                      {dueTodayTasks.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={handleNotificationClick}
                          className="w-full rounded-xl border border-yellow-100 bg-yellow-50 p-3 text-left transition hover:bg-yellow-100 dark:border-yellow-950 dark:bg-yellow-950/40 dark:hover:bg-yellow-950/70"
                        >
                          <p className="break-words text-sm font-semibold text-slate-800 dark:text-white">
                            {task.title}
                          </p>

                          <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                            Due today
                          </p>
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          {/* Dropdown footer */}
          <div className="border-t border-slate-200 p-3 dark:border-slate-700">
            <button
              type="button"
              onClick={handleNotificationClick}
              className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskNotifications;