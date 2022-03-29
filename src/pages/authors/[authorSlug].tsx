import { AUTHOR_POSTS_PER_PAGE } from "#/config/authors";
import { useRouterPage } from "#/hooks/useRouterPage";
import {
  getAllAuthorSlugs,
  getAuthorInfo,
  listPostsFromAuthor,
  usePostsFromAuthor,
} from "@/api/author";
import BlogPostList from "@/containers/BlogPostList";
import RouterPagination from "@/components/RouterPagination";
import AuthorInformation from "@/containers/AuthorInformation";
import FullLayout from "@/layouts/FullLayout";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Author, PostsOrPages } from "@tryghost/content-api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

interface AuthorProfilePageProps {
  author: Author;
  initialPosts: PostsOrPages;
  totalPageCount: number;
}
const AuthorProfilePage: NextPage<AuthorProfilePageProps> = ({
  author,
  initialPosts,
  totalPageCount,
}) => {
  const page = useRouterPage();
  const router = useRouter();

  const posts = usePostsFromAuthor(
    router.query.authorSlug as string,
    initialPosts,
    page,
    AUTHOR_POSTS_PER_PAGE
  );

  if (!posts) {
    return null;
  }

  return (
    <FullLayout>
      <Container>
        <Box mt={4}>
          <AuthorInformation author={author} variant="full"/>
        </Box>

        <Box mt={8}>
          <Typography variant="h3" align="center">
            Bài viết của {author.name ?? "Author"}
          </Typography>
        </Box>

        <Stack mt={4} spacing={2}>
          <BlogPostList posts={posts} />
          <RouterPagination
            count={totalPageCount}
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
    return { notFound: true };
  }

  const author = await getAuthorInfo(authorSlug);
  const posts = await listPostsFromAuthor(authorSlug, 1, AUTHOR_POSTS_PER_PAGE);

  return {
    props: {
      author,
      initialPosts: posts,
      totalPageCount: posts.meta.pagination.pages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const authorSlugs = await getAllAuthorSlugs();
  const paths = authorSlugs.map((authorSlug) => ({
    params: {
      authorSlug: authorSlug as string,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
