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
  Vite environment variable se API URL milega.

  Local development:
  http://localhost:5001

  Production:
  https://your-render-api.onrender.com
*/
const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL;

/*
  Environment variable missing ho to
  development me clear warning show hogi.
*/
if (!apiBaseURL && import.meta.env.DEV) {
  console.warn(
    "VITE_API_BASE_URL is missing. Falling back to http://localhost:5001"
  );
}

/*
  Common Axios instance.
*/
const taskApi = axios.create({
  baseURL:
    apiBaseURL || "http://localhost:5001",

  headers: {
    "Content-Type": "application/json",
  },

  /*
    Render Free service cold start ko
    handle karne ke liye 60-second timeout.
  */
  timeout: 60000,
});

/*
  Request interceptor.

  Request logging sirf development mode me hogi.
*/
taskApi.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(
        `API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
  Response interceptor.

  Network aur server errors centrally log honge.
*/
taskApi.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error(
        "Unable to connect to the API server."
      );
    } else {
      console.error(
        `API Error ${error.response.status}:`,
        error.response.data
      );
    }

    return Promise.reject(error);
  }
);

export default taskApi;


// import axios from "axios";

// const taskApi = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_BASE_URL ||
//     "http://localhost:5001",
// });

// export default taskApi;