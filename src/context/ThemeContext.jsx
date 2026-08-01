// import { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// function ThemeProvider({ children }) {
//   const [darkMode, setDarkMode] = useState(() => {
//     return JSON.parse(localStorage.getItem("darkMode")) || false;
//   });

//   useEffect(() => {
//     localStorage.setItem(
//       "darkMode",
//       JSON.stringify(darkMode)
//     );

//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   function toggleTheme() {
//     setDarkMode(!darkMode);
//   }

//   return (
//     <ThemeContext.Provider
//       value={{
//         darkMode,
//         toggleTheme,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export default ThemeProvider;

import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("taskflow-theme");

    return savedTheme === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("taskflow-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("taskflow-theme", "light");
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((currentMode) => !currentMode);
  }

  const value = {
    darkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };