import { ID } from "@directus/sdk";

type Status = "archived" | "draft" | "published";

function joinSubfield(fieldName: string, subFields: string[]): string[] {
  return subFields.map((subField) => `${fieldName}.${subField}`);
}

export interface DirectusFile {
  id: number;
  title: string;
  description: string;
}

export const fileFields = ["id", "title", "description"];

export interface Author {
  id: ID;
  avatar: DirectusFile | null;
  slug: string;
  first_name: string;
  last_name: string;
  description: string | null;
}

export const authorFields = [
  "id",
  ...joinSubfield("avatar", fileFields),
  "slug",
  "first_name",
  "last_name",
  "description",
];

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

export interface LocalizedPost {
  posts_id: PostRoot;
  id: ID;
  slug: string;
  title: string;
  status: Status;
  author: Author;
  languages_code: {
    code: Locale;
  };
  content: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
}

export type Post = Omit<LocalizedPost, "posts_id"> & PostRoot;

export const localizedPostFields = [
  ...joinSubfield("posts_id", postRootFields),
  "id",
  "slug",
  "title",
  "status",
  ...joinSubfield("author", authorFields),
  "languages_code.code",
  "content",
  "excerpt",
  "created_at",
  "updated_at",
];

interface DirectusCollectionsRaw {
  posts: PostRoot;
  posts_translations: Post;
  directus_users: Author;
  directus_files: DirectusFile;
}

export type DirectusCollections = Omit<DirectusCollectionsRaw, never>;

export interface ListResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export type StringKey<T> = Extract<keyof T, string>;

export type Locale = "en" | "vi";
