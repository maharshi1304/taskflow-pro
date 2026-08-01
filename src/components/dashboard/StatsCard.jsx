// function StatsCard({
//   title,
//   value,
//   color,
//   icon,
// }) {
//   return (
//     <div
//       className={`rounded-xl ${color} p-6 text-white shadow-lg transition hover:scale-105 duration-300`}
//     >
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold">
//           {title}
//         </h3>

//         <div className="text-3xl">
//           {icon}
//         </div>
//       </div>

//       <h2 className="mt-6 text-4xl font-bold">
//         {value}
//       </h2>
//     </div>
//   );
// }

// export default StatsCard;

import {
  FaTasks,
} from "react-icons/fa";


function StatsCard({
  title,
  value,
  color = "blue",
  icon
}) {


  const colors = {

    blue:
      "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",

    green:
      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",

    yellow:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",

    red:
      "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",

    orange:
      "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",

  };



  return (

    <div
      className="
        flex
        items-center
        justify-between

        rounded-2xl

        bg-white

        p-6

        shadow-lg

        transition
        duration-300

        hover:-translate-y-1

        dark:bg-slate-800
      "
    >


      <div>

        <p
          className="
            text-sm
            font-semibold

            text-slate-500

            dark:text-slate-400
          "
        >
          {title}
        </p>


        <h2
          className="
            mt-2
            text-3xl
            font-bold

            text-slate-800

            dark:text-white
          "
        >
          {value}
        </h2>


      </div>



      <div
        className={`
          rounded-full
          p-4

          ${colors[color]}
        `}
      >

        {
          icon || <FaTasks/>
        }


      </div>


    </div>

  );

}


export default StatsCard;