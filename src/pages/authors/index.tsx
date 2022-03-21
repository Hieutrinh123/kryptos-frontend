import { AUTHORS_PER_PAGE } from "#/config/authors";
import { useRouterPage } from "#/utils/useRouterPage";
import { listAuthors, useAuthorList } from "@/api/author";
import AuthorCard from "@/containers/AuthorCard";
import RouterPagination from "@/components/RouterPagination";
import FullLayout from "@/layouts/FullLayout";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Authors } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface AuthorListPageProps {
  initialAuthors: Authors;
  totalPageCount: number;
}

const AuthorListPage: NextPage<AuthorListPageProps> = ({
  initialAuthors,
  totalPageCount,
}) => {
  const page = useRouterPage();
  const authors = useAuthorList(initialAuthors, page, AUTHORS_PER_PAGE);

  return (
    <FullLayout>
      <Container>
        <Typography variant="h3" textAlign="center" mt={3}>
          Các tác giả
        </Typography>
        <Stack spacing={3} mt={3}>
          {authors.map((author) => (
            <AuthorCard author={author} key={author.slug} variant="detailed" />
          ))}
        </Stack>
        <RouterPagination count={totalPageCount} basePath={`authors`} />
      </Container>
    </FullLayout>
  );
};

export default AuthorListPage;

export const getStaticProps: GetServerSideProps<
  AuthorListPageProps
> = async () => {
  const authors = await listAuthors(1, AUTHORS_PER_PAGE);
  return {
    props: {
      initialAuthors: authors,
      totalPageCount: authors.meta.pagination.pages,
    },
  };
};
