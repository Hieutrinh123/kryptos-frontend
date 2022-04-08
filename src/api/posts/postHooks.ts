import {
  listPosts,
  listPostsByCategories,
  Locale,
  Post,
  PostListingResult,
} from "@/api";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function usePosts(ids: string[], page: number, limit: number) {
  const [fetchedPosts, setFetchedPosts] = useState<PostListingResult>();

  useEffect(() => {
    if (ids.length) {
      const filteredIds = ids.filter((id) => !_.isNil(id));

      listPosts(page, limit, { filter: { id: { _in: filteredIds } } }).then(
        (posts) => {
          setFetchedPosts(posts);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids), limit, page]);

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
