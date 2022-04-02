export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
}

export function resolveImageUrl<T extends StrapiImage | undefined>(
  image: T
): T extends StrapiImage ? string : undefined {
  if (!image) {
    return undefined as any;
  }
  return (process.env.NEXT_PUBLIC_STRAPI_URL + image.url) as any;
}

export interface ListResult<T> {
  results: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

type StringKey<T> = Extract<keyof T, string>;
type TypeOrArray<T> = T | T[];
type SingleOperator =
  | "$eq"
  | "$ne"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$contains"
  | "$notContains"
  | "$containsi"
  | "$notContainsi"
  | "$null"
  | "$notNull"
  | "$startsWith"
  | "$endsWith";

type ListOperator = "$in" | "$notIn";
type TopLevelOperator = "$between" | "$or" | "$and";

type Clause<T> = {
  [field in keyof T]?:
    | {
        [operator in SingleOperator]?: T[field];
      }
    | {
        [operator in ListOperator]?: T[field][];
      }
    | Clause<T[field]>;
};

export type Locale = "all" | "en" | "vi";

export interface ListingOptions<T> {
  sort?: `${StringKey<T>}:${"asc" | "desc"}`;
  pagination?: {
    page: number;
    pageSize: number;
  };
  populate?: TypeOrArray<StringKey<T>>;
  locale?: Locale;
  filters?:
    | Clause<T>
    | {
        [operator in TopLevelOperator]?: Clause<T>[];
      };
}
