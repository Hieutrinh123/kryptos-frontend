import { api } from "@/api/api";
import { Author, PostsOrPages } from "@tryghost/content-api";

export async function listAuthors(page: number, limit: number = 10) {
  return api.authors.browse({ page, limit });
}

export async function getAuthorInfo(
  authorSlug: string
): Promise<Author | null> {
  try {
    return await api.authors.read({ slug: authorSlug });
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getPostsFromAuthor(
  authorSlug: string
): Promise<PostsOrPages | null> {
  try {
    return await api.posts.browse({
      filter: `authors.slug:${authorSlug}`,
      include: ["authors", "tags"],
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}
