import axios from "axios";
import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_STRAPI_URL ?? "") + "/api",
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "indices" });
  },
});
