function filterTasks(
  tasks,
  search,
  statusFilter,
  priorityFilter,
  sortOrder
) {
  return [...tasks]
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      statusFilter === "All"
        ? true
        : task.status === statusFilter
    )
    .filter((task) =>
      priorityFilter === "All"
        ? true
        : task.priority === priorityFilter
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      return b.title.localeCompare(a.title);
    });
}

export default filterTasks;