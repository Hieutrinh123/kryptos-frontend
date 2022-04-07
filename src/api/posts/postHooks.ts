import {
  listPosts,
  listPostsByCategories,
  Locale,
  Post,
  PostListingResult,
} from "@/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function usePosts(ids: number[]) {
  const [fetchedPosts, setFetchedPosts] = useState<PostListingResult>();
  useEffect(() => {
    listPosts(1, 3, { filter: { id: { _in: ids } } }).then(setFetchedPosts);
  }, [ids]);

  return fetchedPosts;
}
export function useRelatedPosts(
  post: Post
): [PostListingResult | undefined, boolean] {
  const [fetchedPosts, setFetchedPosts] = useState<PostListingResult>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const categorySlugArray = post.categories.length
      ? [post.categories[0].slug]
      : undefined;

    setLoading(true);

    if (categorySlugArray) {
      listPostsByCategories(
        categorySlugArray,
        router.locale as Locale,
        1,
        3
      ).then((value) => {
        setFetchedPosts(value);
        setLoading(false);
      });
    }
  }, [post, router.locale]);

  return [fetchedPosts, loading];
}
