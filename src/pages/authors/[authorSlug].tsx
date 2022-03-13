import { getAuthorInfo, getPostsFromAuthor } from "@/api/author";
import AuthorInformation from "@/containers/AuthorInformation";
import BlogPostList from "@/components/BlogPostList";
import FullLayout from "@/layouts/FullLayout";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Author, PostsOrPages } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface AuthorProfilePageProps {
  author: Author;
  posts: PostsOrPages;
}
const AuthorProfilePage: NextPage<AuthorProfilePageProps> = ({
  author,
  posts,
}) => {
  return (
    <FullLayout>
      <Container>
        <Box mt={4}>
          <AuthorInformation author={author} />
        </Box>

        <Box mt={8}>
          <Typography variant="h3" align="center">
            Bài viết của {author.name ?? "Author"}
          </Typography>
        </Box>

        <Box mt={4}>
          <BlogPostList posts={posts} />
        </Box>
      </Container>
    </FullLayout>
  );
};

export default AuthorProfilePage;

export const getServerSideProps: GetServerSideProps<
  AuthorProfilePageProps
> = async (context) => {
  const authorSlug = context.params?.authorSlug as string;
  if (!authorSlug) {
    return { notFound: true };
  }
  console.log(authorSlug);
  const author = await getAuthorInfo(authorSlug);
  const posts = await getPostsFromAuthor(authorSlug);
  if (!author || !posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      author,
      posts,
    },
  };
};
