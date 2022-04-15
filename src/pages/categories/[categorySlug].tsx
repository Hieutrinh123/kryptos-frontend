import { AUTHORS_PER_PAGE } from "#/config/authors";
import { COMMON_CACHE_TIME } from "#/config/caching";
import { getAllLeafCategories } from "#/config/navigation";
import { POSTS_PER_PAGE } from "#/config/posts";
import { useRouterPage } from "#/hooks/useRouterPage";
import { useIsMobile } from "#/styles/responsive";
import { AuthorListingResult, listAuthors, listPostsByCategories } from "@/api";
import { getPageSettings } from "@/api";
import { listPosts, PostListingResult } from "@/api";
import { Locale } from "@/api";
import RouterPagination from "@/components/RouterPagination";
import AuthorList from "@/containers/AuthorList";
import BlogPostList from "@/containers/BlogPostList";
import FullLayout from "@/layouts/FullLayout";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextLink from "next/link";
import { useEffect, useState } from "react";

interface CategoryBlogListPageProps {
  categorySlug: string;
  authors: AuthorListingResult;
  initialPosts: PostListingResult;
}

const CategoryBlogListPage: NextPage<CategoryBlogListPageProps> = ({
  categorySlug,
  authors,
  initialPosts,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const page = useRouterPage();

  const [postListResult, setPostListResult] = useState(initialPosts);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setPostListResult(initialPosts);
    } else {
      setUpdating(true);
      listPosts(page, POSTS_PER_PAGE).then((posts) => {
        setPostListResult(posts);
        setUpdating(false);
      });
    }
  }, [page, initialPosts, categorySlug]);

  if (!postListResult || updating) {
    return null;
  }
  return (
    <FullLayout>
      <Container sx={{ marginY: 6 }}>
        <Stack spacing={5}>
          <Typography variant="h3" fontWeight={900} textAlign="center">
            {t("Posts")}
          </Typography>

          <BlogPostList posts={postListResult.data} mobileCarousel={false} />

          <RouterPagination
            count={initialPosts.pagination.pageCount}
            basePath={`/categories/${categorySlug}`}
          />
          {!isMobile && (
            <>
              <Typography variant="h3" fontWeight={900} textAlign="center">
                {t("Authors")}
              </Typography>
              <AuthorList authors={authors.data} />
              <NextLink href="/authors" passHref>
                <Link textAlign="center">{t("View More")}</Link>
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
      revalidate: COMMON_CACHE_TIME,
    };
  }

  const authors = await listAuthors(1, AUTHORS_PER_PAGE);
  const posts = await listPostsByCategories(
    [categorySlug],
    context.locale as Locale,
    1,
    POSTS_PER_PAGE
  );

  if (_.isNil(posts)) {
    return {
      notFound: true,
      revalidate: COMMON_CACHE_TIME,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
      authors,
      initialPosts: posts,
      categorySlug: categorySlug,
    },
    revalidate: COMMON_CACHE_TIME,
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
