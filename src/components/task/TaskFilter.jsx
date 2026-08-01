
// import useTask from "../../hooks/useTask";

// function TaskFilter() {
//   const {
//     search,
//     setSearch,
//     statusFilter,
//     setStatusFilter,
//     priorityFilter,
//     setPriorityFilter,
//     sortOrder,
//     setSortOrder,
//   } = useTask();

//   return (
//     <div className="
//       mb-8
//       rounded-xl
//       bg-white
//       p-6
//       shadow-md
//       dark:bg-slate-800
//     ">

//       <h2 className="
//         mb-5
//         text-xl
//         font-bold
//         text-slate-800
//         dark:text-white
//       ">
//         🔎 Filter Tasks
//       </h2>


//       <div className="
//         grid
//         gap-4
//         md:grid-cols-4
//       ">

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search task..."
//           value={search}
//           onChange={(e)=>setSearch(e.target.value)}
//           className="
//             rounded-lg
//             border
//             border-slate-300
//             bg-white
//             px-4
//             py-3
//             text-slate-800
//             outline-none
//             focus:border-blue-500
//             dark:border-slate-600
//             dark:bg-slate-700
//             dark:text-white
//           "
//         />


//         {/* Status */}
//         <select
//           value={statusFilter}
//           onChange={(e)=>setStatusFilter(e.target.value)}
//           className="
//             rounded-lg
//             border
//             border-slate-300
//             bg-white
//             px-4
//             py-3
//             text-slate-800
//             dark:border-slate-600
//             dark:bg-slate-700
//             dark:text-white
//           "
//         >

//           <option value="All">
//             All Status
//           </option>

//           <option value="Pending">
//             Pending
//           </option>

//           <option value="Completed">
//             Completed
//           </option>

//         </select>



//         {/* Priority */}
//         <select
//           value={priorityFilter}
//           onChange={(e)=>setPriorityFilter(e.target.value)}
//           className="
//             rounded-lg
//             border
//             border-slate-300
//             bg-white
//             px-4
//             py-3
//             text-slate-800
//             dark:border-slate-600
//             dark:bg-slate-700
//             dark:text-white
//           "
//         >

//           <option value="All">
//             All Priority
//           </option>

//           <option value="High">
//             High
//           </option>

//           <option value="Medium">
//             Medium
//           </option>

//           <option value="Low">
//             Low
//           </option>

//         </select>



//         {/* Sort */}
//         <select
//           value={sortOrder}
//           onChange={(e)=>setSortOrder(e.target.value)}
//           className="
//             rounded-lg
//             border
//             border-slate-300
//             bg-white
//             px-4
//             py-3
//             text-slate-800
//             dark:border-slate-600
//             dark:bg-slate-700
//             dark:text-white
//           "
//         >

//           <option value="A-Z">
//             A-Z
//           </option>

//           <option value="Z-A">
//             Z-A
//           </option>

//         </select>


//       </div>

//     </div>
//   );
// }

// export default TaskFilter;



import useTask from "../../hooks/useTask";

function TaskFilter() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortOrder,
    setSortOrder,
  } = useTask();

  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-lg
        transition-colors
        duration-300
        dark:bg-slate-800
      "
    >
      <h2
        className="
          mb-6
          text-2xl
          font-bold
          text-slate-800
          dark:text-white
        "
      >
        Filter Tasks
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Search */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-300
            "
          >
            Search
          </label>

          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-800
              placeholder:text-slate-400
              outline-none
              transition
              focus:border-blue-500

              dark:border-slate-600
              dark:bg-slate-700
              dark:text-white
              dark:placeholder:text-slate-400
            "
          />
        </div>

        {/* Status */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-300
            "
          >
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-800
              outline-none
              transition
              focus:border-blue-500

              dark:border-slate-600
              dark:bg-slate-700
              dark:text-white
            "
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-300
            "
          >
            Priority
          </label>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-800
              outline-none
              transition
              focus:border-blue-500

              dark:border-slate-600
              dark:bg-slate-700
              dark:text-white
            "
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Sort */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-300
            "
          >
            Sort
          </label>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-800
              outline-none
              transition
              focus:border-blue-500

              dark:border-slate-600
              dark:bg-slate-700
              dark:text-white
            "
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default TaskFilter;