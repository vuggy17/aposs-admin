import axios from "axios";

import { notification } from "antd";
import { STATUS_ERROR } from "../../api/ApiStatus";
import { ENP_TOKEN } from "api/EndPoint";
import Environment from "environment/index";
import LocalStorageService from "services/LocalStorage";
import { LOGIN } from "routes/route.config";

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    if (!config.url.match("auth")) {
      config.headers = {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      };
    }
    config.baseURL = Environment.baseUrl;
    console.log(config);
    return config;
  },
  function (error) {
    handleError(error.response?.status);
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
    const originalRequest = error.config;

    //  there is any previous get token request
    if (
      error.response?.status === 401 &&
      originalRequest.url.match(ENP_TOKEN)
    ) {
      // window.location = LOGIN;
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = LocalStorageService.getRefreshToken();
      // make new axios call to get new auth token
      return axiosInstance.post(ENP_TOKEN, refreshToken).then((res) => {
        if (res.status === 201) {
          LocalStorageService.setAuthToken(res.data);
          // axiosInstance.defaults.headers.common["Authorization"] =
          //   "Bearer " + LocalStorageService.getAuthToken();
          axiosInstance.config.header = {
            Authorization: "Bearer " + LocalStorageService.getAuthToken(),
          };
          return axiosInstance(originalRequest);
        }
      });
    }

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
    case STATUS_ERROR.HTTP_400_BAD_REQUEST:
      message = "Bad request, check request url";
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

export { axiosInstance as axios };
