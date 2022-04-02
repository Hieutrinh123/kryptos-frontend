import { Category } from "#/config/category";
import { contentToExcerpt } from "#/utils/contentToExcerpt";
import { axiosInstance } from "./api";
import { Author } from "./author";
import { ListingOptions, ListResult, StrapiImage } from "./strapi";

interface Localization {
  id: number;
  slug: string;
  locale: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  locale: string;
  thumbnail?: StrapiImage;
  localizations: Localization[];
  author: Author;
  excerpt?: string;
  category?: Category;
}

export function getExcerpt(post: Post): string {
  return post.excerpt ? post.excerpt : contentToExcerpt(post.content);
}

export type PostListingResult = ListResult<Post>;

export async function getPostDetail(slug: string): Promise<Post> {
  const response = await axiosInstance.get<Post>(`/posts/${slug}`);
  return response.data;
}

export async function listPosts(options: ListingOptions<Post>) {
  const response = await axiosInstance.get<PostListingResult>(`/posts/`, {
    params: options,
  });
  return response.data;
}

export async function listAllPostSlugs() {
  let slugs: string[] = [];
  for (let page = 1; ; ++page) {
    const postListing = await listPosts({
      pagination: { page, pageSize: 100 },
    });
    const posts = postListing.results;
    slugs = slugs.concat(posts.map((post) => post.slug));
    if (postListing.pagination.page >= postListing.pagination.pageCount) {
      break;
    }
  }
  return slugs;
}

export function listHighlightedPosts() {
  return listPosts({
    sort: "publishedAt:desc",
    pagination: { page: 1, pageSize: 6 },
  });
}

export function listPostsByCategory(
  category: Category,
  page: number,
  pageSize: number
) {
  let allCategorySlugs: string[];
  if (!category.subcategories) {
    allCategorySlugs = [category.slug];
  } else {
    allCategorySlugs = category.subcategories.map(
      (subcategory) => subcategory.slug
    );
  }

  return listPosts({
    sort: "publishedAt:desc",
    pagination: { page, pageSize },
    filters: {
      category: {
        slug: {
          $in: allCategorySlugs,
        },
      },
    },
  });
}
