import {useTheme} from "../../hooks/useTheme.js";

function ThemeToggle() {
  const {darkMode, toggleTheme,} = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;
