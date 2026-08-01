
// import { Outlet } from "react-router-dom";

// import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";
// import Footer from "../components/layout/Footer";

// function MainLayout() {
//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
//       <Navbar />

//       <div className="flex">
//         <Sidebar />

//         <main
//              className="
//              flex-1
//              p-6
//              bg-slate-100
//              dark:bg-slate-900
//              transition-colors
//              duration-300
//              "
//         >
//           <Outlet/>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default MainLayout;


// import { Outlet } from "react-router-dom";

// import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";
// import Footer from "../components/layout/Footer";

// function MainLayout() {
//   return (
//     <div
//       className="
//         min-h-screen
//         bg-slate-100
//         transition-colors
//         duration-300
//         dark:bg-slate-950
//       "
//     >
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="flex">

//         {/* Sidebar */}
//         <Sidebar />

//         {/* Page Content */}
//         <main
//           className="
//             flex-1
//             min-h-[calc(100vh-4rem)]
//             p-6
//             transition-colors
//             duration-300

//             md:p-8
//           "
//         >
//           <div
//             className="
//               mx-auto
//               w-full
//               max-w-7xl
//             "
//           >
//             <Outlet />
//           </div>
//         </main>

//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default MainLayout;

// import { useState } from "react";

// import { Outlet } from "react-router-dom";

// import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";
// import Footer from "../components/layout/Footer";


// function MainLayout() {


//   const [sidebarOpen, setSidebarOpen] = useState(false);



//   return (

//     <div
//       className="
//         min-h-screen
//         bg-slate-100

//         dark:bg-slate-900
//       "
//     >


//       <Navbar
//         setSidebarOpen={setSidebarOpen}
//       />



//       <div
//         className="
//           flex
//           min-h-[calc(100vh-64px)]
//         "
//       >


//         <Sidebar

//           sidebarOpen={sidebarOpen}

//           setSidebarOpen={setSidebarOpen}

//         />



//         <main
//           className="
//             flex-1
//             overflow-y-auto
//             p-4

//             sm:p-6

//             lg:p-8
//           "
//         >

//           <Outlet />

//         </main>


//       </div>



//       <Footer/>


//     </div>

//   );

// }


// export default MainLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      {/* Fixed-height navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      {/* Remaining available screen space */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Only this section will scroll */}
        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer remains outside the scrolling content */}
      <Footer />
    </div>
  );
}

export default MainLayout;