import { Pagination } from "@tryghost/content-api";

interface BrowseResults<T> extends Array<T> {
  meta: { pagination: Pagination };
}

export function sliceBrowseResult<T>(
  result: BrowseResults<T>,
  start: number,
  end: number
): BrowseResults<T> {
  return Object.assign(result.slice(start, end), { meta: result.meta });
}
