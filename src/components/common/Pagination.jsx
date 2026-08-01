function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  /*
    Agar sirf ek page hai,
    pagination show karne ki zarurat nahi hai.
  */
  if (totalPages <= 1) {
    return null;
  }

  /*
    Total pages ke according page numbers
    ka array create karta hai.

    Example:
    totalPages = 4
    result = [1, 2, 3, 4]
  */
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      aria-label="Task pagination"
      className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row"
    >
      {/* Page information */}
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        Page{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {totalPages}
        </span>
      </p>

      {/* Pagination buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Previous
        </button>

        {/* Page number buttons */}
        <div className="hidden items-center gap-2 sm:flex">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() =>
                onPageChange(pageNumber)
              }
              aria-current={
                currentPage === pageNumber
                  ? "page"
                  : undefined
              }
              className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-bold transition ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export default Pagination;