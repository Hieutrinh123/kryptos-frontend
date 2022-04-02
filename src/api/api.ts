import axios from "axios";
import qs from "qs";

axios.interceptors.request.use(
  function (config) {
    console.log("requesting", config.url);
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

export const axiosInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_STRAPI_URL ?? "") + "/api",
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "indices" });
  },
});
