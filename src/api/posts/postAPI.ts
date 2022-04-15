import { nonNil } from "#/utils/nonNil";
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
    data: localizedPosts.data.map(flattenPostTranslation).filter(nonNil),
  };
}

export async function listNewestPostSlugs() {
  const postListing = await listPosts(1, 20);
  const posts = postListing.data;
  return posts.map((post) => post.slug).filter(nonNil);
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
    return flattenPostTranslation(localizedPost) ?? null;
  } catch (e) {
    return null;
  }
}
