import { AUTHORS_PER_PAGE } from "#/config/authors";
import { useRouterPage } from "#/hooks/useRouterPage";
import { listAuthors, useAuthorList } from "@/api/author";
import RouterPagination from "@/components/RouterPagination";
import AuthorInformation from "@/containers/AuthorInformation";
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
      <Container sx={{ paddingY: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h3" textAlign="center" mt={3}>
            Các tác giả
          </Typography>
          <Stack spacing={3} mt={3}>
            {authors.map((author) => (
              <AuthorInformation
                author={author}
                key={author.slug}
                variant="compact"
              />
            ))}
          </Stack>
          <RouterPagination count={totalPageCount} basePath={`authors`} />
        </Stack>
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
