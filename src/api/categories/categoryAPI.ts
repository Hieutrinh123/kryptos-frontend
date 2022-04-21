import { listPosts, Locale, PostListingResult } from "@/api";

export async function listPostsByCategories(
  categorySlugs: string[],
  locale: Locale,
  page: number,
  limit: number
): Promise<PostListingResult> {
  return listPosts(page, limit, {
    filter: {
      languages_code: {
        code: {
          _eq: locale,
        },
      },
      posts_id: {
        categories: {
          // @ts-ignore
          categories_id: {
            slug: {
              _in: categorySlugs,
            },
          },
        },
      },
    },
  });
}
