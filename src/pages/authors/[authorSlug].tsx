import {
  AUTHOR_DETAIL_PAGE_CACHE_TIME,
  COMMON_CACHE_TIME,
} from "#/config/caching";
import { POSTS_PER_PAGE } from "#/config/posts";
import { useStateWithPropsDefault } from "#/hooks/useStateWithPropsDefault";
import {
  Author,
  getAllAuthorSlugs,
  getAuthor,
  getAuthorName,
  getPageSettings,
  listPostsFromAuthor,
  Locale,
  PostListingResult,
} from "@/api";
import RouterPagination from "@/components/RouterPagination";
import AuthorInformation from "@/containers/AuthorInformation";
import BlogPostList from "@/containers/BlogPostList";
import FullLayout from "@/layouts/FullLayout";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AuthorProfilePageProps {
  author: Author;
  initialPosts: PostListingResult;
}

const AuthorProfilePage: NextPage<AuthorProfilePageProps> = ({
  author,
  initialPosts,
}) => {
  const [posts, setPosts] = useStateWithPropsDefault(initialPosts);

  const router = useRouter();

  useEffect(() => {
    const authorSlug = router.query.authorSlug as string;
    const page = parseInt((router.query.page as string) ?? "1");
    if (page === 1) {
      setPosts(initialPosts);
    } else {
      listPostsFromAuthor(
        authorSlug,
        page,
        POSTS_PER_PAGE,
        router.locale as Locale
      ).then(setPosts);
    }
  }, [initialPosts, router.locale, router.query, setPosts]);

  if (!author) {
    return null;
  }
  return (
    <FullLayout>
      <Container>
        <Box mt={4}>
          <AuthorInformation author={author} variant="full" />
        </Box>

        <Box mt={8}>
          <Typography variant="h3" align="center">
            Bài viết của {getAuthorName(author) ?? "Authors"}
          </Typography>
        </Box>

        <Stack mt={4} spacing={5}>
          {posts && <BlogPostList posts={posts.data} />}
          <RouterPagination
            count={initialPosts.pagination.pageCount}
            basePath={`/authors/${author.slug}`}
          />
        </Stack>
      </Container>
    </FullLayout>
  );
};

export default AuthorProfilePage;

export const getStaticProps: GetStaticProps<AuthorProfilePageProps> = async (
  context
) => {
  const authorSlug = context.params?.authorSlug as string;
  if (!authorSlug) {
    return {
      notFound: true,
      revalidate: COMMON_CACHE_TIME,
    };
  }

  const author = await getAuthor(authorSlug);
  const posts = await listPostsFromAuthor(
    authorSlug,
    1,
    POSTS_PER_PAGE,
    context.locale as Locale
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
      author,
      initialPosts: posts,
    },
    revalidate: AUTHOR_DETAIL_PAGE_CACHE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const authorSlugs = await getAllAuthorSlugs();
  const paths = authorSlugs.map((authorSlug) => ({
    params: {
      authorSlug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
