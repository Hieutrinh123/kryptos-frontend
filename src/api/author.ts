import { api } from "@/api/api";
import { Author, PostsOrPages } from "@tryghost/content-api";

export async function listAuthors(page: number, limit: number = 10) {
  return api.authors.browse({ page, limit });
}

export async function getAuthorInfo(authorSlug: string): Promise<Author> {
  return api.authors.read({ slug: authorSlug });
}

export async function getPostsFromAuthor(
  authorSlug: string
): Promise<PostsOrPages> {
  return api.posts.browse({
    filter: `authors.slug:${authorSlug}`,
    include: ["authors", "tags"],
  });
}
