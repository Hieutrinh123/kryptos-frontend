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

export type Status = "archived" | "draft" | "published";

export interface LanguageCode {
  code: Locale;
}

export const languageCodeFields = ["code"];

export function joinSubfield(fieldName: string, subFields: string[]): string[] {
  return subFields.map((subField) => `${fieldName}.${subField}`);
}
