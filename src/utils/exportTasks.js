/*
  CSV cell को safely format करता है.

  Example:
  Learn React, Router

  CSV में बनेगा:
  "Learn React, Router"
*/
function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  /*
    Double quotes को CSV format में
    दो double quotes से replace करते हैं.
  */
  const escapedValue = stringValue.replace(
    /"/g,
    '""'
  );

  return `"${escapedValue}"`;
}

/*
  Current date और time के आधार पर
  CSV filename बनाता है.

  Example:
  taskflow-tasks-2026-08-01.csv
*/
function createFileName(prefix = "taskflow-tasks") {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return `${prefix}-${today}.csv`;
}

/*
  Tasks array को CSV file में convert
  करके browser download start करता है.
*/
function exportTasksToCsv(
  tasks,
  fileName = createFileName()
) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return {
      success: false,
      message: "No tasks available to export.",
    };
  }

  /*
    CSV column headings.
  */
  const headers = [
    "Task ID",
    "Title",
    "Priority",
    "Status",
    "Due Date",
  ];

  /*
    Har task को CSV row में convert करते हैं.
  */
  const rows = tasks.map((task) => [
    task.id,
    task.title,
    task.priority,
    task.status,
    task.dueDate || "No due date",
  ]);

  /*
    Header और task rows को combine करते हैं.
  */
  const csvRows = [
    headers,
    ...rows,
  ];

  /*
    Har value को safe CSV value में convert
    करके comma से join करते हैं.
  */
  const csvContent = csvRows
    .map((row) =>
      row
        .map((value) => escapeCsvValue(value))
        .join(",")
    )
    .join("\n");

  /*
    UTF-8 BOM add किया गया है ताकि Excel में
    special characters properly दिखाई दें.
  */
  const csvWithBom = `\uFEFF${csvContent}`;

  /*
    Browser में downloadable file बनाते हैं.
  */
  const csvBlob = new Blob(
    [csvWithBom],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const downloadUrl =
    URL.createObjectURL(csvBlob);

  const downloadLink =
    document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);

  /*
    Temporary browser URL को release करते हैं.
  */
  URL.revokeObjectURL(downloadUrl);

  return {
    success: true,
  };
}

export {exportTasksToCsv,};