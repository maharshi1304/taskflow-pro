function ErrorState({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/40">
      <div className="mb-4 text-5xl">
        ⚠️
      </div>

      <h3 className="text-xl font-bold text-red-700 dark:text-red-300">
        Unable to load tasks
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm text-red-600 dark:text-red-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;