import { PostsToCategories } from "@/api/categories/postToCategoryTypes";
import { Comment, Reply } from "@/api/comments";
import { PageSettingTranslation } from "@/api/pageSettings";
import { Directus, DirectusOptions, QueryMany, TypeOf } from "@directus/sdk";
import { RawAuthor } from "./authors/authorTypes";
import { ListResult, StringKey } from "./commonTypes";
import { DirectusFile } from "./files";
import { PostTranslation } from "./posts";

interface DirectusCollectionsRaw {
  comments: Comment;
  comment_replies: Reply;
  posts_translations: PostTranslation;
  page_settings_translations: PageSettingTranslation;
  posts_categories: PostsToCategories;
  directus_users: RawAuthor;
  directus_files: DirectusFile;
  categories: {
    slug: string;
    id: number;
  };
}

export type DirectusCollections = Omit<DirectusCollectionsRaw, never>;

function getDirectusOptions(): DirectusOptions {
  if (process.env.DIRECTUS_ACCESS_TOKEN) {
    return {
      auth: {
        mode: "json",
        staticToken: process.env.DIRECTUS_ACCESS_TOKEN,
      },
      transport: {
        url: process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "",
        headers: {
          "Cache-Control": "no-store",
        },
      },
    };
  }
  return {};
}

export const directusInstance = new Directus<DirectusCollections>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "",
  getDirectusOptions()
);

export async function directusListItem<
  C extends StringKey<DirectusCollections>
>(
  collection: C,
  page: number,
  limit: number,
  query?: QueryMany<TypeOf<DirectusCollections, C>>
): Promise<ListResult<DirectusCollections[C]>> {
  const result = await directusInstance.items(collection).readByQuery({
    page,
    limit,
    meta: "filter_count",
    ...query,
  });
  const data = (result.data ?? []) as Array<DirectusCollections[C]>;

  const filterCount = result.meta?.filter_count!;
  return {
    data,
    pagination: {
      page,
      pageSize: limit,
      pageCount: Math.ceil(filterCount / limit),
      total: filterCount,
    },
  };
}

export async function directusGetFirstItem<
  C extends StringKey<DirectusCollections>
>(collection: C, query?: QueryMany<TypeOf<DirectusCollections, C>>) {
  const response = await directusInstance.items(collection).readByQuery(query);

  if (!response || !response.data || response.data.length <= 0) {
    throw new Error("Not Found Error");
  }

  return response.data[0] as DirectusCollections[C];
}
