import GhostContentAPI from "@tryghost/content-api";
export const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_CONTENT_API_URL ?? "",
  key: process.env.NEXT_PUBLIC_CONTENT_API_KEY ?? "",
  version: "v3",
});
