import { ListResult } from "../commonTypes";

export interface Category {
  slug: string;
  name: string;
}

export const categoryFields = ["slug", "name"];

export type CategoryListingResult = ListResult<Category>;
