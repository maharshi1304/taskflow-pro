import taskApi from "../api/taskApi";

/*
  GET /tasks

  JSON Server se sabhi tasks receive karta hai.
*/
export async function getTasks() {
  const response = await taskApi.get("/tasks");

  return response.data;
}

/*
  POST /tasks

  JSON Server me new task create karta hai.
*/
export async function createTask(taskData) {
  const response = await taskApi.post(
    "/tasks",
    taskData
  );

  return response.data;
}

/*
  PATCH /tasks/:id

  Existing task ke selected fields update karta hai.
*/
export async function updateTask(
  taskId,
  updatedFields
) {
  const response = await taskApi.patch(
    `/tasks/${taskId}`,
    updatedFields
  );

  return response.data;
}

/*
  DELETE /tasks/:id

  Selected task ko JSON Server se delete karta hai.
*/
export async function deleteTask(taskId) {
  const response = await taskApi.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};

