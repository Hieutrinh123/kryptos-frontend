import axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_STRAPI_URL ?? "") + "/api",
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "indices" });
  },
});

export const dataApolloClient = new ApolloClient({
  uri: (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "") + "/graphql",
  cache: new InMemoryCache(),
});

export const managementApolloClient = new ApolloClient({
  uri: (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "") + "/graphql/system",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.DIRECTUS_ACCESS_TOKEN}`,
  },
});
