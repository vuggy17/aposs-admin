import axios from "axios";
import { getToken } from "util/storage/cookie";
import { Environment } from ".environment";
import { notification } from "antd";
import { STATUS_ERROR } from "./ApiStatus";

axios.interceptors.request.use(
  function (config) {
    // inject jwt authenticaion token
    config.headers = {
      Authorization: "Bearer " + getToken("auth"),
    };
    config.baseURL = Environment.baseURL;
    console.log("baseurl is", config.baseURL);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    handleError(error.response.status);
    return Promise.reject(error);
  }
);

function handleError(code) {
  let message = "Unexpected error";

  switch (code) {
    case STATUS_ERROR.HTTP_401_UNAUTHENTICATED:
      message = "Unauthenticated, try login again";
      break;
    case STATUS_ERROR.HTTP_404_NOT_FOUND:
      message = "Item not found";
      break;
    case STATUS_ERROR.HTTP_500_INTERNAL_SERVER_ERROR:
      message = "Internal server error, please contact administrator";
      break;
    default:
      break;
  }

  notification.error({ message: "Error", description: message });
}
