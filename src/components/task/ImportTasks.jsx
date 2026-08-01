import {
  useRef,
  useState,
} from "react";

import { FaFileImport } from "react-icons/fa";
import { toast } from "react-toastify";
import Papa from "papaparse";

import useTask from "../../hooks/useTask";

import {
  validateTask,
  isDuplicateTaskTitle,
} from "../../utils/taskValidation";

function ImportTasks() {
  const {
    tasks,
    importTasks,
  } = useTask();

  const fileInputRef = useRef(null);

  const [isImporting, setIsImporting] =
    useState(false);

  /*
    CSV headings ko application ke
    task object format me convert karta hai.
  */
  function normalizeRow(row) {
    return {
      title:
        row.Title?.trim() ||
        row.title?.trim() ||
        "",

      priority:
        row.Priority?.trim() ||
        row.priority?.trim() ||
        "Medium",

      status:
        row.Status?.trim() ||
        row.status?.trim() ||
        "Pending",

      dueDate:
        row["Due Date"]?.trim() ||
        row.dueDate?.trim() ||
        "",
    };
  }

  /*
    File input ko reset karta hai,
    taaki same file dobara select ho sake.
  */
  function resetFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /*
    Selected CSV file parse aur import karta hai.
  */
  function handleFileChange(event) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const isCsvFile =
      selectedFile.name
        .toLowerCase()
        .endsWith(".csv");

    if (!isCsvFile) {
      toast.error(
        "Please select a valid CSV file."
      );

      resetFileInput();
      return;
    }

    setIsImporting(true);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        try {
          /*
            Serious CSV parsing errors hone par
            import stop karte hain.
          */
          if (results.errors.length > 0) {
            console.error(
              "CSV parsing errors:",
              results.errors
            );

            toast.error(
              "CSV file contains invalid data."
            );

            return;
          }

          const normalizedTasks =
            results.data.map(normalizeRow);

          const validTasks = [];

          let invalidCount = 0;
          let duplicateCount = 0;

          /*
            Existing project task titles ko
            lowercase Set me store karte hain.
          */
          const existingTitles = new Set(
            tasks.map((task) =>
              task.title
                ?.trim()
                .toLowerCase()
            )
          );

          /*
            Same CSV ke andar duplicate titles
            track karne ke liye.
          */
          const importedTitles = new Set();

          normalizedTasks.forEach((task) => {
            const validation =
              validateTask(task);

            if (!validation.isValid) {
              invalidCount += 1;
              return;
            }

            const normalizedTask =
              validation.normalizedTask;

            const normalizedTitle =
              normalizedTask.title.toLowerCase();

            /*
              Existing API tasks ke against
              duplicate check.
            */
            const alreadyExists =
              isDuplicateTaskTitle(
                tasks,
                normalizedTask.title
              );

            /*
              Same CSV file ke andar
              duplicate title check.
            */
            const duplicateInsideCsv =
              importedTitles.has(
                normalizedTitle
              );

            if (
              alreadyExists ||
              existingTitles.has(
                normalizedTitle
              ) ||
              duplicateInsideCsv
            ) {
              duplicateCount += 1;
              return;
            }

            importedTitles.add(
              normalizedTitle
            );

            validTasks.push(
              normalizedTask
            );
          });

          if (validTasks.length === 0) {
            if (duplicateCount > 0) {
              toast.error(
                "No new tasks were imported because all valid rows were duplicates."
              );
            } else {
              toast.error(
                "No valid tasks found in the CSV file."
              );
            }

            return;
          }

          const result =
            await importTasks(validTasks);

          if (!result.success) {
            toast.error(
              result.message ||
                "Unable to import tasks."
            );

            return;
          }

          toast.success(
            `${result.createdCount} tasks imported successfully.`
          );

          const skippedCount =
            invalidCount +
            duplicateCount +
            result.failedCount;

          if (skippedCount > 0) {
            toast.warning(
              `${skippedCount} rows were skipped.`
            );
          }
        } catch (error) {
          console.error(
            "Unexpected CSV import error:",
            error
          );

          toast.error(
            "An unexpected error occurred while importing tasks."
          );
        } finally {
          setIsImporting(false);
          resetFileInput();
        }
      },

      error: (error) => {
        console.error(
          "Unable to read CSV file:",
          error
        );

        setIsImporting(false);
        resetFileInput();

        toast.error(
          "Unable to read the selected CSV file."
        );
      },
    });
  }

  return (
    <>
      {/* Hidden CSV file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Visible import button */}
      <button
        type="button"
        disabled={isImporting}
        onClick={() =>
          fileInputRef.current?.click()
        }
        className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaFileImport />

        {isImporting
          ? "Importing..."
          : "Import CSV"}
      </button>
    </>
  );
}

export default ImportTasks;