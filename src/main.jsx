// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import App from "./App";
// import TaskProvider from "./context/TaskContext";

// import "react-toastify/dist/ReactToastify.css";
// import "./index.css";

// import ThemeProvider from "./context/ThemeContext";

// ReactDOM.createRoot(document.getElementById("root")).render(

//    <BrowserRouter>
//     <ThemeProvider>
//      < TaskProvider>
//        <App />
//      </TaskProvider>
//     </ThemeProvider>
//    </BrowserRouter>

// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import TaskProvider from "./context/TaskContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);