import { Category } from "#/config/category";

import { QueryMany } from "@directus/sdk";
import _ from "lodash";
import { directusGetFirstItem, directusListItem } from "../directus";
import {
  flattenLocalizedPost,
  localizedPostFields,
  Post,
  PostListingResult,
  PostTranslation,
} from "./postTypes";

export async function listPosts(
  page: number,
  limit: number,
  query?: QueryMany<PostTranslation>
): Promise<PostListingResult> {
  const defaultQuery: QueryMany<PostTranslation> = {
    fields: localizedPostFields,
    filter: {
      status: "published",
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
    data: localizedPosts.data.map(flattenLocalizedPost),
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
  return slugs;
}

export async function listPostsByCategory(
  category: Category,
  page: number,
  limit: number
) {
  return await listPosts(page, limit, {
    sort: ["-updated_at"],
  });
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const localizedPost = await directusGetFirstItem("posts_translations", {
    filter: {
      slug: {
        _eq: slug,
      },
    },
    fields: localizedPostFields,
  });
  return flattenLocalizedPost(localizedPost);
}
