
function Footer() {
  return (
    <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
        {/* Left side */}
        <div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">
            TaskFlow Pro
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Organize your work smarter 
          </p>
        </div>

        {/* Right side */}
        <div className="text-sm text-slate-500 dark:text-slate-400 md:text-right">
          <p>© {new Date().getFullYear()} TaskFlow Pro ❤️</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

