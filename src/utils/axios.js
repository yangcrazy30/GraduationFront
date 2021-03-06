import axios from "axios";
import qs from "qs";
import config from './config';
axios.defaults.baseURL = config.baseURL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  config.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("ujs");
  if (config.method === "get") {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    };
  }
  return config;
});

export default axios;
