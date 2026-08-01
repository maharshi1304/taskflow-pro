function validateTask({
  title,
  priority,
  status,
  dueDate,
}) {
  const trimmedTitle = title?.trim() || "";

  if (!trimmedTitle) {
    return {
      isValid: false,
      message: "Task title is required.",
    };
  }

  if (trimmedTitle.length < 3) {
    return {
      isValid: false,
      message: "Task title must contain at least 3 characters.",
    };
  }

  if (trimmedTitle.length > 80) {
    return {
      isValid: false,
      message: "Task title cannot exceed 80 characters.",
    };
  }

  const validPriorities = [
    "High",
    "Medium",
    "Low",
  ];

  if (!validPriorities.includes(priority)) {
    return {
      isValid: false,
      message: "Please select a valid priority.",
    };
  }

  const validStatuses = [
    "Pending",
    "Completed",
  ];

  if (!validStatuses.includes(status)) {
    return {
      isValid: false,
      message: "Please select a valid task status.",
    };
  }

  if (!dueDate) {
    return {
      isValid: false,
      message: "Due date is required.",
    };
  }

  const parsedDueDate = new Date(
    `${dueDate}T00:00:00`
  );

  if (Number.isNaN(parsedDueDate.getTime())) {
    return {
      isValid: false,
      message: "Please select a valid due date.",
    };
  }

  return {
    isValid: true,
    normalizedTask: {
      title: trimmedTitle,
      priority,
      status,
      dueDate,
    },
  };
}

function isDuplicateTaskTitle(
  tasks,
  title,
  excludedTaskId = null
) {
  const normalizedTitle =
    title.trim().toLowerCase();

  return tasks.some(
    (task) =>
      task.id !== excludedTaskId &&
      task.title.trim().toLowerCase() ===
        normalizedTitle
  );
}

export {
  validateTask,
  isDuplicateTaskTitle,
};