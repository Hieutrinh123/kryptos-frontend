import { AUTHORS_PER_PAGE } from "#/config/authors";
import { AUTHOR_LIST_PAGE_CACHE_TIME } from "#/config/caching";
import { useRouterPage } from "#/hooks/useRouterPage";
import { AuthorListingResult, listAuthors } from "@/api";
import { getPageSettings } from "@/api";
import { Locale } from "@/api";
import RouterPagination from "@/components/RouterPagination";
import AuthorInformation from "@/containers/AuthorInformation";
import FullLayout from "@/layouts/FullLayout";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

interface AuthorListPageProps {
  initialAuthors: AuthorListingResult;
}

const AuthorListPage: NextPage<AuthorListPageProps> = ({ initialAuthors }) => {
  const page = useRouterPage();
  const { t } = useTranslation();
  const [authors, setAuthors] = useState(initialAuthors);
  useEffect(() => {
    if (page === 1) {
      setAuthors(initialAuthors);
    } else {
      listAuthors(page, AUTHORS_PER_PAGE).then(setAuthors);
    }
  }, [page, initialAuthors]);

  return (
    <FullLayout>
      <Container sx={{ paddingY: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h3" textAlign="center" mt={3}>
            {t("Authors")}
          </Typography>
          <Stack spacing={3} mt={3}>
            {authors.data.map((author) => (
              <AuthorInformation
                author={author}
                key={author.id}
                variant="compact"
              />
            ))}
          </Stack>
          <RouterPagination
            count={authors.pagination.pageCount}
            basePath={`authors`}
          />
        </Stack>
      </Container>
    </FullLayout>
  );
};

export default AuthorListPage;

export const getStaticProps: GetServerSideProps<AuthorListPageProps> = async (
  context
) => {
  const authors = await listAuthors(1, AUTHORS_PER_PAGE);
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
      initialAuthors: authors,
    },
    revalidate: AUTHOR_LIST_PAGE_CACHE_TIME,
  };
};
