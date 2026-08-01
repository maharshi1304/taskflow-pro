/*
  Date value ko local date object me convert karta hai.

  Example:
  "2026-08-15"
  ↓
  Date object
*/
function createLocalDate(dateValue) {
  if (!dateValue) {
    return null;
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/*
  Current date ko midnight par normalize karta hai.

  Time remove karne se date comparison accurate hota hai.
*/
function getTodayDate() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

/*
  Due date ko readable format me show karta hai.

  Example:
  2026-08-15
  ↓
  15 Aug 2026
*/
function formatDueDate(dateValue) {
  const date = createLocalDate(dateValue);

  if (!date) {
    return "No due date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/*
  Check karta hai ki due date current date se pehle hai ya nahi.
*/
function isOverdue(dateValue) {
  const dueDate = createLocalDate(dateValue);

  if (!dueDate) {
    return false;
  }

  return dueDate < getTodayDate();
}

/*
  Check karta hai ki due date aaj ki date hai ya nahi.
*/
function isDueToday(dateValue) {
  const dueDate = createLocalDate(dateValue);

  if (!dueDate) {
    return false;
  }

  return dueDate.getTime() === getTodayDate().getTime();
}

/*
  Check karta hai ki due date future me hai ya nahi.
*/
function isUpcoming(dateValue) {
  const dueDate = createLocalDate(dateValue);

  if (!dueDate) {
    return false;
  }

  return dueDate > getTodayDate();
}

/*
  Due date ke according status return karta hai.

  Possible output:
  - Overdue
  - Due Today
  - Upcoming
  - No Due Date

  Completed task ke liye "Completed" return hoga.
*/
function getDueDateStatus(dateValue, taskStatus) {
  if (taskStatus === "Completed") {
    return "Completed";
  }

  if (!dateValue) {
    return "No Due Date";
  }

  if (isOverdue(dateValue)) {
    return "Overdue";
  }

  if (isDueToday(dateValue)) {
    return "Due Today";
  }

  if (isUpcoming(dateValue)) {
    return "Upcoming";
  }

  return "No Due Date";
}

export {
  formatDueDate,
  isOverdue,
  isDueToday,
  isUpcoming,
  getDueDateStatus,
};