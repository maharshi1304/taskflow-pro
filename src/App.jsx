// import Navbar from "./components/Navbar";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import { ToastContainer } from "react-toastify";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* Public page */}
//         <Route path="/login" element={<Login />} />

//         {/* Layout */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />

//           <Route path="/dashboard" element={<Dashboard />} />
  
//           <Route path="/profile" element={<Profile />} />
//         </Route>
        
//         {/* 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
      
//       <ToastContainer position="top-right" autoClose={2000} />
//       </>
//   );
// }

// export default App;

import { Routes,Route,} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Routes using MainLayout */}
        <Route element={<MainLayout />}>
          {/* Public home page */}
          <Route path="/" element={<Home />}/>

          {/* Protected dashboard */}
          <Route
            path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected profile */}
          <Route
            path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
        </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );
}

export default App;

