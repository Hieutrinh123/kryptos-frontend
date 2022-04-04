import { Category } from "#/config/category";
import { contentToExcerpt } from "#/utils/contentToExcerpt";
import { directusGetByUniqueField, directusListItem } from "@/api/directus";
import { QueryMany } from "@directus/sdk";
import { ListResult, Post, localizedPostFields } from "./types";

export function getExcerpt(post: Post): string {
  return post.excerpt ? post.excerpt : contentToExcerpt(post.content);
}

export type PostListingResult = ListResult<Post>;

export async function getPost(slug: string): Promise<Post> {
  return directusGetByUniqueField("posts_translations", "slug", slug, {
    fields: localizedPostFields,
  });
}

export async function listPosts(
  page: number,
  limit: number,
  query?: QueryMany<Post>
) {
  return directusListItem("posts_translations", page, limit, {
    ...query,
    fields: localizedPostFields,
  });
}

export async function listAllPostSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const postListing = await listPosts(page, 100);
    const posts = postListing.data;
    slugs = slugs.concat(posts.map((post) => post.slug));
    if (postListing.pagination.page >= postListing.pagination.pageCount) {
      break;
    }
  }
  return slugs;
}

export function listPostsByCategory(
  category: Category,
  page: number,
  limit: number
) {
  return listPosts(page, limit, {
    sort: ["-updated_at"],
  });
}
