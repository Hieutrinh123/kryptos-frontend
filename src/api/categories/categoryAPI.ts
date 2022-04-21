import { nonNil } from "#/utils/nonNil";
import {
  directusListItem,
  flattenPostTranslation,
  Locale,
  PostListingResult,
  PostTranslation,
} from "@/api";
import { postToCategoryField } from "./postToCategoryTypes";

export async function listPostsByCategories(
  categorySlugs: string[],
  locale: Locale,
  page: number,
  limit: number
): Promise<PostListingResult> {
  const postsToCategories = await directusListItem(
    "posts_categories",
    page,
    limit,
    {
      fields: postToCategoryField,
      sort: ["-created_at"],
      filter: {
        _or: [
          {
            categories_id: {
              slug: {
                _in: categorySlugs,
              },
            },
          },
        ],
      },

      deep: {
        posts_id: {
          // @ts-ignore
          translations: {
            _filter: {
              status: {
                _eq: "published",
              },
              languages_code: {
                _eq: locale,
              },
            },
          },
        },
      },
    }
  );
  return {
    pagination: postsToCategories.pagination,
    data: postsToCategories.data
      .map((link) => {
        const translationsArray = link.posts_id
          .translations as PostTranslation[];
        if (!translationsArray || translationsArray.length === 0) {
          return null;
        }
        return translationsArray[0];
      })
      .filter(nonNil)
      .map(flattenPostTranslation)
      .filter(nonNil),
  };
}
