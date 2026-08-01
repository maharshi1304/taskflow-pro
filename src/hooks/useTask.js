import { useContext } from "react";

import { TaskContext } from "../context/TaskContext";

function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTask must be used inside TaskProvider."
    );
  }

  return context;
}

export default useTask;