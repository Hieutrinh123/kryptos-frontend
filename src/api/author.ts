import { api } from "@/api/api";
import { Author, Authors, PostsOrPages } from "@tryghost/content-api";
import { useEffect, useState } from "react";

export async function getAllAuthorSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const authors = await api.authors.browse({ page });
    if (!authors) {
      continue;
    }
    slugs = slugs.concat(authors.map((author) => author.slug));
    if (!authors.meta.pagination.next) {
      break;
    }
  }
  return slugs;
}

export async function listAuthors(page: number, limit: number) {
  return api.authors.browse({ page, limit });
}

export function useAuthorList(
  initialAuthors: Authors,
  page: number,
  limit: number
) {
  const [authors, setAuthors] = useState(initialAuthors);
  useEffect(() => {
    if (page === 1) {
      setAuthors(initialAuthors);
    } else {
      listAuthors(page, limit).then(setAuthors);
    }
  }, [page, limit, initialAuthors]);
  return authors;
}

export async function getAuthorInfo(authorSlug: string): Promise<Author> {
  return api.authors.read({ slug: authorSlug });
}

export async function listPostsFromAuthor(
  authorSlug: string,
  page: number = 1,
  limit: number = 10
): Promise<PostsOrPages> {
  return api.posts.browse({
    page,
    limit,
    filter: `authors.slug:${authorSlug}`,
    include: ["authors", "tags"],
  });
}

export function usePostsFromAuthor(
  authorSlug: string,
  initialPosts: PostsOrPages,
  page: number,
  limit: number = 10
) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    if (page === 1) {
      setPosts(initialPosts);
    } else {
      listPostsFromAuthor(authorSlug, page, limit).then(setPosts);
    }
  }, [page, limit, initialPosts, authorSlug]);

  return posts;
}
