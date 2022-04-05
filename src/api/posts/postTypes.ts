import { contentToExcerpt } from "#/utils/contentToExcerpt";
import { ID } from "@directus/sdk";
import _ from "lodash";
import { Author, authorFields } from "../authors/authorTypes";
import {
  joinSubfield,
  LanguageCode,
  languageCodeFields,
  ListResult,
  Status,
} from "../commonTypes";
import { DirectusFile, fileFields } from "../files";

export interface PostRoot {
  id: ID;
  thumbnail: DirectusFile | null;
  categories: string[];
}

export const postRootFields = [
  "id",
  ...joinSubfield("thumbnail", fileFields),
  "status",
  "categories",
];

export interface PostTranslation {
  posts_id: PostRoot;
  id: ID;
  slug: string;
  title: string;
  status: Status;
  author: Author;
  languages_code: LanguageCode;
  content: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
}

export const localizedPostFields = [
  ...joinSubfield("posts_id", postRootFields),
  "id",
  "slug",
  "title",
  "status",
  ...joinSubfield("author", authorFields),
  ...joinSubfield("languages_code", languageCodeFields),
  "content",
  "excerpt",
  "created_at",
  "updated_at",
];

export type Post = Omit<PostTranslation, "posts_id"> & PostRoot;

export type PostListingResult = ListResult<Post>;

export function getExcerpt(post: Post): string {
  return post.excerpt ? post.excerpt : contentToExcerpt(post.content);
}

export function flattenLocalizedPost(localizedPost: PostTranslation): Post {
  return {
    ..._.omit(localizedPost, "posts_id"),
    ...localizedPost.posts_id,
  };
}
