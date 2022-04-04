import { directusGetByUniqueField, directusListItem } from "@/api/directus";
import { PostListingResult } from "@/api/posts";
import { Author, ListResult } from "./types";

export type AuthorListingResult = ListResult<Author>;

export async function listAuthors(
  page: number,
  limit: number
): Promise<AuthorListingResult> {
  return directusListItem("directus_users", page, limit);
}

export async function getAuthor(slug: string): Promise<Author> {
  return directusGetByUniqueField("directus_users", "slug", slug);
}

export function getAuthorName(author: Author): string {
  return author.first_name + " " + author.last_name;
}

export async function getAllAuthorSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const authorListResult = await listAuthors(page, 100);
    if (!authorListResult || !authorListResult.data) {
      continue;
    }
    slugs = slugs.concat(authorListResult.data.map((author) => author.slug));
    if (
      authorListResult.pagination.page >= authorListResult.pagination.pageCount
    ) {
      break;
    }
  }
  return slugs;
}

export async function listPostsFromAuthor(
  authorSlug: string
): Promise<PostListingResult> {
  return {
    data: [],
    pagination: {
      page: 0,
      total: 0,
      pageSize: 0,
      pageCount: 0,
    },
  };
}
