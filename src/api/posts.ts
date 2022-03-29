import { Category } from "#/config/navigation";
import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import { useEffect, useState } from "react";
import { api } from "./api";

export async function getPostDetail(slug: string): Promise<PostOrPage> {
  return await api.posts.read({ slug }, { include: ["tags", "authors"] });
}

export function usePostList(
  initialPosts: PostsOrPages,
  page: number,
  limit: number = 1
) {
  const [posts, setPosts] = useState(initialPosts);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setPosts(initialPosts);
    } else {
      setUpdating(true);
      listPosts(page, limit).then((posts) => {
        setPosts(posts);
        setUpdating(false);
      });
    }
  }, [page, limit, initialPosts]);

  return {
    posts,
    updating,
  };
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
