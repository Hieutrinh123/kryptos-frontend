import { AUTHORS_PER_PAGE } from "#/config/authors";
import { AuthorListingResult } from "@/api";
import { useListAuthorsWithIds } from "@/api/authors/authorHooks";
import AuthorInformation from "@/containers/AuthorInformation";
import { useFollowedAuthorIds } from "@/firebase/firestore/useAuthorFollow";
import { Box, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React, { Dispatch, SetStateAction, useState } from "react";

interface UserInformationManagement {
  title: string;
}
const PersonalAuthorList: React.FC<UserInformationManagement> = ({ title }) => {
  const [page, setPage] = useState(1);
  const { ids: authorIds, loading: loadingIds } = useFollowedAuthorIds();
  const { authors, loading: loadingAuthors } = useListAuthorsWithIds(
    authorIds,
    page,
    AUTHORS_PER_PAGE
  );
  const { t } = useTranslation();

  return (
    <Paper sx={{ padding: 6 }}>
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight="bolder" align="center">
          {title}
        </Typography>
        {loadingIds || loadingAuthors ? (
          <Box alignSelf="center">
            <CircularProgress />
          </Box>
        ) : !authors?.data || authors.data.length === 0 ? (
          <Typography fontWeight="bolder" align="center">
            {t("Nothing Yet")}
          </Typography>
        ) : (
          <AuthorListAndPagination
            authors={authors}
            page={page}
            setPage={setPage}
          />
        )}
      </Stack>
    </Paper>
  );
};
interface AuthorListAndPaginationProps {
  authors: AuthorListingResult;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const AuthorListAndPagination: React.FC<AuthorListAndPaginationProps> = ({
  authors,
  page,
  setPage,
}) => {
  return (
    <>
      {authors.data.map((author) => (
        <AuthorInformation author={author} variant="compact" key={author.id} />
      ))}
      {authors.data.length > 0 && (
        <Box display="flex" justifyContent="center">
          <Pagination page={page} onChange={(event, page) => setPage(page)} />
        </Box>
      )}
    </>
  );
};

export default PersonalAuthorList;
