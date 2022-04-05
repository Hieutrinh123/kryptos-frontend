import { joinSubfield } from "../commonTypes";
import { PostTranslation, postTranslationFields } from "../posts";
import { Category, categoryFields } from "./categoryTypes";

export interface PostsToCategories {
  created_at: string;
  posts_id: {
    translations: PostTranslation[];
  };
  categories_id: Category;
}

export const postToCategoryField = [
  "created_at",
  ...joinSubfield("posts_id.translations", postTranslationFields),
  ...joinSubfield("categories_id", categoryFields),
];
