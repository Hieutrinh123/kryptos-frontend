import { getFinalCategories } from "#/config/navigation";
import { POSTS_PER_PAGE } from "#/config/posts";
import { useIsMobile } from "#/styles/responsive";
import { listAuthors } from "@/api/author";
import { countPostsByCategorySlug, listPostsByCategorySlug } from "@/api/posts";
import BlogPostList from "@/components/BlogPostList";
import RouterPagination from "@/components/RouterPagination";
import AuthorList from "@/containers/AuthorList";
import FullLayout from "@/layouts/FullLayout";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Authors, PostsOrPages } from "@tryghost/content-api";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface CategoryBlogListPageProps {
  category: string;
  authors: Authors;
  totalPageCount: number;
  posts: PostsOrPages;
}

const CategoryBlogListPage: NextPage<CategoryBlogListPageProps> = ({
  category,
  authors,
  posts,
  totalPageCount,
}) => {
  const isMobile = useIsMobile();
  if (!posts) {
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
            basePath={`/categories/${category}`}
          />
          {!isMobile && (
            <>
              <Typography variant="h3" fontWeight={900} textAlign="center">
                Các tác giả
              </Typography>
              <AuthorList authors={authors} />
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

  const page = parseInt((context.params?.page ?? "1") as string);

  const authors = await listAuthors(1);
  const posts = await listPostsByCategorySlug(
    categorySlug,
    page,
    POSTS_PER_PAGE
  );

  if (_.isNil(posts)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      authors,
      posts,
      category: categorySlug,
      totalPageCount: posts.meta.pagination.pages,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const finalCategories = getFinalCategories();
  const categoryPostCounts = await Promise.all(
    finalCategories.map(countPostsByCategorySlug)
  );

  const paths = _.zip(finalCategories, categoryPostCounts).flatMap(
    ([category, count]) => {
      const pageCount = Math.ceil(count! / POSTS_PER_PAGE);
      return _.range(1, pageCount + 1, 1).map((page) => ({
        params: {
          categorySlug: category as string,
          page: page.toString(),
        },
      }));
    }
  );

  return {
    paths,
    fallback: true,
  };
};
