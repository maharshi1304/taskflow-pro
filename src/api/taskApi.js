// import axios from "axios";

// const taskApi = axios.create({
//   baseURL: "http://localhost:5001",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default taskApi;


import axios from "axios";

/*
  API URL .env file se receive hoga.

  Development URL:
  http://localhost:5000
*/
const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL;

/*
  Agar .env variable missing hai,
  to development ke time clear warning milegi.
*/
if (!apiBaseURL) {
  console.warn(
    "VITE_API_BASE_URL is missing from the .env file."
  );
}

/*
  Common Axios instance.

  Is instance ka use karke hume har request me
  complete URL likhne ki zarurat nahi padegi.
*/
const taskApi = axios.create({
  baseURL:
    apiBaseURL || "http://localhost:5001",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

/*
  Request interceptor:

  Har API request send hone se pehle chalega.
  Development ke time request inspect karne me useful hai.
*/
taskApi.interceptors.request.use(
  (config) => {
    console.log(
      `API Request: ${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
  Response interceptor:

  Har successful ya failed API response ko
  centrally handle kar sakte hain.
*/
taskApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error(
        "Unable to connect to the API server."
      );
    } else {
      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );
    }

    return Promise.reject(error);
  }
);

export default taskApi;