import { ID } from "@directus/sdk";
import { joinSubfield, ListResult } from "../commonTypes";
import { DirectusFile, fileFields } from "../files";

export interface Author {
  id: ID;
  avatar: DirectusFile | null;
  slug: string;
  first_name: string;
  last_name: string;
  description: string | null;
  hidden: boolean;
}

export const authorFields = [
  "id",
  "slug",
  ...joinSubfield("avatar", fileFields),
  "first_name",
  "last_name",
  "description",
  "hidden",
];

export type AuthorListingResult = ListResult<Author>;

export function getAuthorName(author: Author): string {
  return author.first_name + " " + author.last_name;
}
