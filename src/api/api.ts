import { DirectusCollections } from "@/api/types";
import { Directus } from "@directus/sdk";
import axios from "axios";
import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_STRAPI_URL ?? "") + "/api",
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "indices" });
  },
});

export const serverDirectus = new Directus<DirectusCollections>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "",
  {
    auth: {
      mode: "json",
      staticToken: process.env.DIRECTUS_ACCESS_TOKEN,
    },
  }
);

export const clientDirectus = new Directus<DirectusCollections>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ""
);
