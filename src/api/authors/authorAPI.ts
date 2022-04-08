import { QueryMany } from "@directus/sdk";
import _ from "lodash";
import {
  RawAuthor,
  Author,
  authorFields,
  AuthorListingResult,
} from "./authorTypes";
import { listPosts, PostListingResult } from "../posts";
import {
  directusGetFirstItem,
  directusInstance,
  directusListItem,
} from "../directus";
import { ListResult } from "../commonTypes";

export async function listAuthors(
  page: number,
  limit: number,
  query?: QueryMany<RawAuthor>
): Promise<AuthorListingResult> {
  const mergedQuery = _.merge(
    {
      fields: authorFields,
      filter: {
        hidden: {
          _eq: false,
        },
      },
    },
    query
  );
  const authors = await directusListItem(
    "directus_users",
    page,
    limit,
    mergedQuery
  );

  return populateAuthorsWithCount(authors);
}

export async function getAuthor(slug: string): Promise<Author> {
  const author = await directusGetFirstItem("directus_users", {
    filter: {
      slug: {
        _eq: slug,
      },
    },
    fields: authorFields,
  });

  const postCounts = await countPostsGroupedByAuthors([author.slug]);

  return {
    ...author,
    postCount: postCounts[author.id],
  };
}

export async function getAllAuthorSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const authorListResult = await listAuthors(page, 100);
    if (!authorListResult || !authorListResult.data) {
      continue;
    }
    slugs = slugs.concat(authorListResult.data.map((author) => author.slug));
    if (
      authorListResult.pagination.page >= authorListResult.pagination.pageCount
    ) {
      break;
    }
  }
  return slugs.filter((slug) => _.isNil(slug));
}

export async function listPostsFromAuthor(
  authorSlug: string,
  page: number,
  limit: number
): Promise<PostListingResult> {
  return listPosts(page, limit, {
    filter: {
      author: {
        slug: {
          _eq: authorSlug,
        },
      },
    },
  });
}

async function populateAuthorsWithCount(authors: ListResult<RawAuthor>) {
  const slugs = authors.data.map((author) => author.slug);
  const postCounts = await countPostsGroupedByAuthors(slugs);
  const authorsWithPostCount = authors.data.map((author) => ({
    ...author,
    postCount: postCounts[author.id] ?? 0,
  }));

  return {
    data: authorsWithPostCount,
    pagination: authors.pagination,
  };
}

interface PostCountByAuthor {
  author: string;
  count: string;
}

async function countPostsGroupedByAuthors(authorSlugs: string[]) {
  if (authorSlugs.length <= 0) {
    return {};
  }
  const results = await directusInstance
    .items("posts_translations")
    .readByQuery({
      filter: {
        author: {
          slug: {
            _in: authorSlugs,
          },
        },
      },
      // @ts-ignore Fixme: probably make a PR to Directus API
      aggregate: {
        count: "*",
      },
      groupBy: ["author"],
    });

  const countRecords = results.data as PostCountByAuthor[];

  const countMap: { [id: string]: number } = {};

  countRecords.forEach((countRecord) => {
    const count = parseInt(countRecord.count);
    countMap[countRecord.author] = isNaN(count) ? 0 : count;
  });

  return countMap;
}
