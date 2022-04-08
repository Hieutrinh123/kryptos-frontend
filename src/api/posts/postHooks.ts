import { Locale } from "../commonTypes";
import { listPostsByCategories } from "../categories";
import { Post, PostListingResult } from "./postTypes";
import { listPosts } from "./postAPI";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useListPostsWithIds(
  ids: string[],
  page: number,
  limit: number
) {
  const [fetchedPosts, setFetchedPosts] = useState<PostListingResult>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filteredIds = ids.filter((id) => !_.isNil(id));
    const numericIds = filteredIds.map((id) => parseInt(id));
    if (filteredIds.length) {
      setLoading(true);
      listPosts(page, limit, { filter: { id: { _in: numericIds } } }).then(
        (posts) => {
          setLoading(false);
          setFetchedPosts(posts);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids), limit, page]);

  return { posts: fetchedPosts, loading };
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
