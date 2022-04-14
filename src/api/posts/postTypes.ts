import { contentToExcerpt } from "#/utils/contentToExcerpt";
import _ from "lodash";
import { Author, authorFields } from "../authors/authorTypes";
import type { Category } from "../categories/categoryTypes";
import {
  joinSubfield,
  LanguageCode,
  languageCodeFields,
  ListResult,
  Status,
} from "../commonTypes";
import { DirectusFile, fileFields } from "../files";

export interface PostRoot {
  id: number;
  thumbnail: DirectusFile | null;
  categories: { categories_id: Category }[];
}

export const postRootFields = [
  "id",
  ...joinSubfield("thumbnail", fileFields),
  "status",
  "categories.categories_id.slug",
  "categories.categories_id.name",
];

export interface PostTranslation {
  posts_id: PostRoot;
  id: number;
  slug: string;
  title: string;
  status: Status;
  author: Author;
  languages_code: LanguageCode;
  content: string;
  excerpt: string;
  hide_excerpt?: boolean;
  created_at: string;
  updated_at: string;
}

export const postTranslationFields = [
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
  "hide_excerpt",
];

export type Post = Omit<PostTranslation, "posts_id"> &
  Omit<PostRoot, "categories"> & {
    categories: Category[];
  };

export type PostListingResult = ListResult<Post>;

export function getExcerpt(post: Post): string {
  return !_.isNil(post.excerpt) ? post.excerpt : contentToExcerpt(post.content);
}

export function flattenPostTranslation(
  localizedPost: PostTranslation
): Post | undefined {
  if (!localizedPost.posts_id) {
    return undefined;
  }
  return {
    ..._.omit(localizedPost, "posts_id"),
    ...localizedPost.posts_id,
    categories: localizedPost.posts_id.categories.map(
      (item) => item.categories_id
    ),
    id: localizedPost.id,
  };
}
