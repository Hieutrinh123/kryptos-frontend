import { QueryMany } from "@directus/sdk";
import _ from "lodash";
import { directusGetFirstItem, directusListItem } from "../directus";
import {
  flattenPostTranslation,
  Post,
  PostListingResult,
  PostTranslation,
  postTranslationFields,
} from "./postTypes";

export async function listPosts(
  page: number,
  limit: number,
  query?: QueryMany<PostTranslation>
): Promise<PostListingResult> {
  const defaultQuery: QueryMany<PostTranslation> = {
    fields: postTranslationFields,
    sort: ["-updated_at"],
    filter: {
      status: {
        _eq: "published",
      },
    },
  };

  const mergedQuery = _.merge(defaultQuery, query);
  const localizedPosts = await directusListItem(
    "posts_translations",
    page,
    limit,
    mergedQuery
  );
  return {
    pagination: localizedPosts.pagination,
    data: localizedPosts.data.map(flattenPostTranslation),
  };
}

export async function listAllPostSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const postListing = await listPosts(page, 100);
    const posts = postListing.data;
    slugs = slugs.concat(posts.map((post) => post.slug));
    if (postListing.pagination.page >= postListing.pagination.pageCount) {
      break;
    }
  }
  return slugs.filter((value) => !_.isNil(value));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const localizedPost = await directusGetFirstItem("posts_translations", {
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _eq: "published",
        },
      },
      fields: postTranslationFields,
    });
    return flattenPostTranslation(localizedPost);
  } catch (e) {
    return null;
  }
}
