import {
  getAllAuthorSlugs,
  getAuthor,
  getAuthorName,
  listPostsFromAuthor,
} from "@/api/authors";
import { getPageSettings } from "@/api/pageSettings";
import { PostListingResult } from "@/api/posts";
import { Locale } from "@/api/types";
import { Author } from "@/api/types";
import RouterPagination from "@/components/RouterPagination";
import AuthorInformation from "@/containers/AuthorInformation";
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
            Bài viết của {getAuthorName(author) ?? "Authors"}
          </Typography>
        </Box>

        <Stack mt={4} spacing={2}>
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
    return {
      notFound: true,
    };
  }

  const author = await getAuthor(authorSlug);
  const posts = await listPostsFromAuthor(authorSlug);

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
