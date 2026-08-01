
// import { NavLink } from "react-router-dom";

// import {
//   FaTimes,
//   FaHome,
//   FaTasks,
//   FaUser,
// } from "react-icons/fa";


// function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
// }) {


//   const menuItems = [
//     {
//       name: "Home",
//       path: "/",
//       icon: <FaHome />,
//     },
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: <FaTasks />,
//     },
//     {
//       name: "Profile",
//       path: "/profile",
//       icon: <FaUser />,
//     },
//   ];



//   return (

//     <aside

//       className={`
//         fixed
//         top-16
//         left-0
//         z-40

//         h-[calc(100vh-64px)]

//         w-64

//         bg-white

//         overflow-y-auto
        
//         shadow-xl

//         transition-transform
//         duration-300


//         dark:bg-slate-800


//         ${
//           sidebarOpen
//           ?
//           "translate-x-0"
//           :
//           "-translate-x-full"
//         }


        

//         lg:translate-x-0

//       `}

//     >



//       {/* Mobile Close Button */}

//       <div
//         className="
//           flex
//           justify-end

//           p-4

//           lg:hidden
//         "
//       >

//         <button
//           onClick={() =>
//             setSidebarOpen(false)
//           }

//           className="
//             text-xl

//             text-slate-700

//             dark:text-white
//           "
//         >

//           <FaTimes />

//         </button>


//       </div>





//       {/* Logo */}

//       <div
//         className="
//           hidden

//           border-b

//           p-5

//           lg:block

//           dark:border-slate-700
//         "
//       >

//         <h2
//           className="
//             text-xl
//             font-bold

//             text-blue-600

//             dark:text-blue-400
//           "
//         >

//           TaskFlow Pro

//         </h2>

//       </div>






//       {/* Menu */}

//       <nav
//         className="
//           mt-5

//           space-y-2

//           px-4
//         "
//       >


//         {
//           menuItems.map((item)=>(


//             <NavLink

//               key={item.name}

//               to={item.path}


//               onClick={() =>
//                 setSidebarOpen(false)
//               }


//               className={({isActive}) => `

//                 flex

//                 items-center

//                 gap-4

//                 rounded-xl

//                 px-4

//                 py-3

//                 text-base

//                 font-semibold


//                 transition


//                 ${
//                   isActive

//                   ?

//                   "bg-blue-600 text-white"

//                   :

//                   "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"

//                 }

//               `}

//             >

//               <span>
//                 {item.icon}
//               </span>


//               <span>
//                 {item.name}
//               </span>


//             </NavLink>


//           ))
//         }


//       </nav>



//     </aside>


//   );

// }


// export default Sidebar;


import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaTasks,
  FaUser,
} from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTasks />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <>
      {/* Mobile dark overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="absolute inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          absolute inset-y-0 left-0 z-40
          flex w-64 flex-col
          border-r border-slate-200
          bg-white shadow-xl
          transition-transform duration-300
          dark:border-slate-700 dark:bg-slate-900

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:relative lg:inset-auto
          lg:shrink-0 lg:translate-x-0
          lg:shadow-none
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700 lg:hidden">
          <h2 className="font-bold text-slate-800 dark:text-white">
            Navigation
          </h2>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
          >
            <FaTimes />
          </button>
        </div>

        {/* Desktop heading */}
        <div className="hidden border-b border-slate-200 p-5 dark:border-slate-700 lg:block">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            TaskFlow Pro
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Task Management Dashboard
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `
                  flex items-center gap-4
                  rounded-xl px-4 py-3
                  text-base font-semibold
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
                `
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom information */}
        <div className="m-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-sm font-semibold text-slate-700 dark:text-white">
            Stay productive
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Organize and complete your tasks efficiently.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;