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
  const [posts, setPosts] = useState<PostListingResult>();
  const [loading, setLoading] = useState(false);

  const filteredIds = ids.filter((id) => !_.isNil(id));
  const numericIds = filteredIds.map((id) => parseInt(id));

  useEffect(() => {
    if (numericIds.length) {
      setLoading(true);
      const slicedIds = numericIds.slice((page - 1) * limit, page * limit);
      listPosts(1, limit, { filter: { id: { _in: slicedIds } } })
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(numericIds), limit, page]);

  return { posts, loading };
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
