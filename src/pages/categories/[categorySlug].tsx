import { AUTHORS_PER_PAGE } from "#/config/authors";
import { getAllLeafCategories } from "#/config/navigation";
import { POSTS_PER_PAGE } from "#/config/posts";
import { useIsMobile } from "#/styles/responsive";
import { useRouterPage } from "#/hooks/useRouterPage";
import { listAuthors } from "@/api/author";
import { listPostsByCategorySlug, usePostList } from "@/api/posts";
import BlogPostList from "@/containers/BlogPostList";
import RouterPagination from "@/components/RouterPagination";
import AuthorList from "@/containers/AuthorList";
import FullLayout from "@/layouts/FullLayout";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Authors, PostsOrPages } from "@tryghost/content-api";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextLink from "next/link";

interface CategoryBlogListPageProps {
  categorySlug: string;
  authors: Authors;
  totalPageCount: number;
  initialPosts: PostsOrPages;
}

const CategoryBlogListPage: NextPage<CategoryBlogListPageProps> = ({
  categorySlug,
  authors,
  initialPosts,
  totalPageCount,
}) => {
  const isMobile = useIsMobile();
  const page = useRouterPage();
  const { posts, loading } = usePostList(initialPosts, page, POSTS_PER_PAGE);

  if (!posts || loading) {
    return null;
  }
  return (
    <FullLayout>
      <Container sx={{ marginY: 6 }}>
        <Stack spacing={5}>
          <Typography variant="h3" fontWeight={900} textAlign="center">
            Các bài viết
          </Typography>

          <BlogPostList posts={posts} mobileCarousel={false} />
          <RouterPagination
            count={totalPageCount}
            basePath={`/categories/${categorySlug}`}
          />
          {!isMobile && (
            <>
              <Typography variant="h3" fontWeight={900} textAlign="center">
                Các tác giả
              </Typography>
              <AuthorList authors={authors} />
              <NextLink href="/authors" passHref>
                <Link textAlign="center">Xem thêm</Link>
              </NextLink>
            </>
          )}
        </Stack>
      </Container>
    </FullLayout>
  );
};

export default CategoryBlogListPage;

export const getStaticProps: GetStaticProps<CategoryBlogListPageProps> = async (
  context
) => {
  const categorySlug = context.params?.categorySlug as string;
  if (!categorySlug) {
    return {
      notFound: true,
    };
  }

  const authors = await listAuthors(1, AUTHORS_PER_PAGE);
  const posts = await listPostsByCategorySlug(categorySlug, 1, POSTS_PER_PAGE);

  if (_.isNil(posts)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      authors,
      initialPosts: posts,
      categorySlug: categorySlug,
      totalPageCount: posts.meta.pagination.pages,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const leafCategories = getAllLeafCategories();

  const paths = leafCategories.map((category) => ({
    params: {
      categorySlug: category as string,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
