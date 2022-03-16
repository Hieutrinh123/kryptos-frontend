import { Category } from "#/config/navigation";
import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
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

export async function listAllPostSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const posts = await api.posts.browse({ page });
    if (!posts) {
      continue;
    }
    slugs = slugs.concat(posts.map((post) => post.slug));
    if (!posts.meta.pagination.next) {
      break;
    }
  }
  return slugs;
}

export async function countPostsByCategorySlug(
  categorySlug: string
): Promise<number> {
  const posts = await api.posts.browse({
    page: 1,
    limit: 1,
    filter: `tags:[${categorySlug}]`,
  });
  return posts.meta.pagination.total;
}

export async function listPostsByCategorySlug(
  categorySlug: string,
  page: number,
  limit: number = 10
): Promise<PostsOrPages> {
  return api.posts.browse({
    page,
    limit,
    filter: `tags:[${categorySlug}]`,
    include: ["authors", "tags"],
  });
}

export function listHighlightedPosts() {
  return api.posts.browse({ limit: 6 });
}

export function listPostsByCategory(
  category: Category,
  page: number = 1,
  limit: number = 10
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
