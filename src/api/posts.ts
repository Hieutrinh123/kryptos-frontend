import { Category } from "#/config/navigation";
import { api } from "./api";

export function getHighlightPosts() {
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
