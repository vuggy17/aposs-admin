import axios from "axios";
import { getToken } from "./util/storage/cookie";

import { notification } from "antd";
import { STATUS_ERROR } from "../../api/ApiStatus";
import { LOGIN } from "api/EndPoint";
import Environment from "environment/index";

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // inject jwt authenticaion token
    config.headers = {
      Authorization: "Bearer " + getToken("auth"),
    };
    config.baseURL = Environment.baseUrl;
    console.log("base url", config.baseURL);
    return config;
  },
  function (error) {
    handleError(error.response.status);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    handleError(error.response?.status, error.message);
    return Promise.reject(error);
  }
);

function handleError(code = 0, message) {
  switch (code) {
    case STATUS_ERROR.HTTP_401_CREDENTIAL_NOT_FOUND:
      message = "Unauthenticated, try login again";
      // TODO: turn on next line to rediect to login page if auth_token exprired
      // window.location = LOGIN;
      break;
    case STATUS_ERROR.HTTP_404_NOT_FOUND:
      message = "Item not found";
      break;
    case STATUS_ERROR.HTTP_500_INTERNAL_SERVER_ERROR:
      message = "Internal server error, please contact administrator";
      break;
    default:
      // if you want to use a default message instead of browser error message for unhandled error
      // message = "Unexpected error";
      break;
  }
  notification.error({ message: "Error", description: message });
}

export default axiosInstance;
