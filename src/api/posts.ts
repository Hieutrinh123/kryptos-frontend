import { Category } from "#/config/navigation";
import { PostOrPage } from "@tryghost/content-api";
import { api } from "./api";

export async function getPostDetail(slug: string): Promise<PostOrPage | null> {
  try {
    return await api.posts.read({ slug }, { include: ["tags", "authors"] });
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function listPosts(page: number, limit: number = 10) {
  return api.posts.browse({ page, limit, include: ["authors", "tags"] });
}

export function listHighlightedPosts() {
  return api.posts.browse({ limit: 6 });
}

export function getPostsByCategory(
  category: Category,
  page: number = 1,
  limit: number = 9
) {
  let allTags: string;
  if (!category.subcategories) {
    allTags = category.slug;
  } else {
    allTags = category.subcategories
      .map((subcategory) => subcategory.slug)
      .join(",");
  }
  return api.posts.browse({
    limit,
    page,
    include: ["authors", "tags"],
    filter: `tags:[${allTags}]`,
  });
}
