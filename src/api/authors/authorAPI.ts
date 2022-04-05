import { Author, authorFields, AuthorListingResult } from "./authorTypes";
import { PostListingResult } from "../posts";
import { directusGetFirstItem, directusListItem } from "../directus";

export async function listAuthors(
  page: number,
  limit: number
): Promise<AuthorListingResult> {
  return directusListItem("directus_users", page, limit);
}

export async function getAuthor(slug: string): Promise<Author> {
  return directusGetFirstItem("directus_users", {
    filter: {
      slug: {
        _eq: slug,
      },
    },
    fields: authorFields,
  });
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
  // Todo: reimplement list posts from author
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
