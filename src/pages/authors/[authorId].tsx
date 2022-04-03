import { AUTHOR_POSTS_PER_PAGE } from "#/config/authors";
import {
  Author,
  getAllAuthorIds,
  getAuthor,
  listPostsFromAuthor,
} from "@/api/author";
import { getPageSettings } from "@/api/pageSettings";
import { PostListingResult } from "@/api/posts";
import { Locale } from "@/api/strapi";
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
import React from "react";

interface AuthorProfilePageProps {
  author: Author;
  initialPosts: PostListingResult;
  totalPageCount: number;
}

const AuthorProfilePage: NextPage<AuthorProfilePageProps> = ({
  author,
  initialPosts,
  totalPageCount,
}) => {
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
            Bài viết của {author.name ?? "Authors"}
          </Typography>
        </Box>

        <Stack mt={4} spacing={2}>
          <BlogPostList posts={initialPosts.results} />
          <RouterPagination
            count={totalPageCount}
            basePath={`/authors/${author.id}`}
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
  const authorIdStr = context.params?.authorId as string;

  if (!authorIdStr) {
    return { notFound: true };
  }
  const authorId = parseInt(authorIdStr);
  if (isNaN(authorId)) {
    return {
      notFound: true,
    };
  }
  const author = await getAuthor(authorId);
  const posts = await listPostsFromAuthor(authorId, {
    pagination: { page: 1, pageSize: AUTHOR_POSTS_PER_PAGE },
    locale: "all",
  });

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
      author,
      initialPosts: posts,
      totalPageCount: posts.pagination.pageCount,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const authorSlugs = await getAllAuthorIds();
  const paths = authorSlugs.map((authorId) => ({
    params: {
      authorId: authorId.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
