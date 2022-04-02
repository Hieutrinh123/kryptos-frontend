import {axiosInstance} from "@/api/api";
import {Post, PostListingResult} from "@/api/posts";
import {ListingOptions, ListResult, StrapiImage} from "./strapi";

export interface Author {
  id: number;
  bio: string;
  postCount: number;
  name: string;
  avatar?: StrapiImage;
}

export type AuthorListingResult = ListResult<Author>;

export async function listAuthors(
  page: number,
  pageSize: number
): Promise<AuthorListingResult> {
  try {
    const response = await axiosInstance.get<AuthorListingResult>("/authors", {
      params: {
        pagination: {
          page,
          pageSize,
        },
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAuthor(id: number): Promise<Author> {
  try {
    const response = await axiosInstance.get<Author>(`/authors/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllAuthorIds() {
  let ids: number[] = [];
  for (let page = 1; ; ++page) {
    const authorListResult = await listAuthors(page, 100);
    if (!authorListResult) {
      continue;
    }
    ids = ids.concat(authorListResult.results.map((author) => author.id));
    if (
      authorListResult.pagination.page >= authorListResult.pagination.pageCount
    ) {
      break;
    }
  }
  return ids;
}

export async function listPostsFromAuthor(
  authorId: number,
  options: ListingOptions<Post>
): Promise<PostListingResult> {
  const response = await axiosInstance.get<PostListingResult>(
    `/authors/${authorId}/posts`,
    {
      params: options,
    }
  );
  return response.data;
}
