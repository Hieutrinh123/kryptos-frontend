import { api } from "./api";

export function getHighlightPosts() {
  return api.posts.browse({ limit: 3 });
}
