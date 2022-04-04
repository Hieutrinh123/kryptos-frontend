import { serverDirectus } from "@/api/api";
import { DirectusCollections, ListResult, StringKey } from "@/api/types";
import { QueryMany, TypeOf } from "@directus/sdk";

export async function directusListItem<
  C extends StringKey<DirectusCollections>
>(
  collection: C,
  page: number,
  limit: number,
  query?: QueryMany<TypeOf<DirectusCollections, C>>
): Promise<ListResult<DirectusCollections[C]>> {
  const result = await serverDirectus.items(collection).readByQuery({
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

export async function directusGetByUniqueField<
  C extends StringKey<DirectusCollections>,
  F extends StringKey<DirectusCollections[C]>
>(
  collection: C,
  fieldName: F,
  value: DirectusCollections[C][F],
  query?: QueryMany<TypeOf<DirectusCollections, C>>
) {
  const response = await serverDirectus.items(collection).readByQuery({
    // @ts-ignore
    filter: {
      [fieldName]: { _eq: value },
    },
    ...query,
  });

  if (!response || !response.data || response.data.length <= 0) {
    throw new Error("Not Found Error");
  }

  return response.data[0] as DirectusCollections[C];
}

interface CMSImage {
  id: number;
}

export function resolveImageUrl<T extends CMSImage | undefined | null>(
  image: T
): T extends CMSImage ? string : undefined {
  if (!image) {
    return undefined as any;
  }
  return (process.env.NEXT_PUBLIC_DIRECTUS_URL + "/assets/" + image.id) as any;
}
