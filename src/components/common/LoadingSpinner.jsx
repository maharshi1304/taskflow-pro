function LoadingSpinner({
  message = "Loading tasks...",
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

      <p className="mt-4 font-medium text-slate-600 dark:text-slate-300">
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner;