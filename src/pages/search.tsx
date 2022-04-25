import { POSTS_PER_PAGE } from "#/config/posts";
import { grey } from "#/styles/colors";
import { useIsDesktop } from "#/styles/responsive";
import { getPageSettings, listPosts, Locale, PostListingResult } from "@/api";
import BlogPostList from "@/containers/BlogPostList";
import BackgroundLayout from "@/layouts/BackgroundLayout";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const SearchPage: NextPage = ({}) => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState<PostListingResult>();
  const [loading, setLoading] = useState(false);
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const handleSearch = useCallback(() => {
    if (searchInput.length) {
      setLoading(true);
      listPosts(1, POSTS_PER_PAGE, {
        filter: {
          languages_code: {
            code: {
              _eq: router.locale as Locale
            },
          },
        },
        search: searchInput,
      })
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.locale, searchInput]);
  return (
    <BackgroundLayout color={grey[500]}>
      <Box position="absolute" top={10} left={10}>
        <IconButton color="secondary" onClick={() => router.back()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Container disableGutters={!isDesktop}>
        <Stack paddingTop={8} paddingBottom={6} spacing={5}>
          <form
            style={{ display: "flex", justifyContent: "center" }}
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <FormControl
              fullWidth
              variant="filled"
              sx={{
                maxWidth: 600,
                alignSelf: "center",
              }}
            >
              <InputLabel htmlFor="search-bar">
                {t("Input Search Terms")}
              </InputLabel>
              <FilledInput
                id="search-bar"
                value={searchInput}
                sx={{
                  color: "black",
                  bgcolor: "white !important",
                  ":focus": {
                    bgcolor: "white",
                  },
                  ":hover": {
                    bgcolor: "white",
                  },
                }}
                onChange={(event) => setSearchInput(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={loading}
                      color="primary"
                      onClick={handleSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
          <Box textAlign="center">{loading && <CircularProgress />}</Box>
          <Box>
            {!loading &&
              posts?.data &&
              (posts.data.length === 0 ? (
                <Typography variant="h4" align="center" color="white">
                  {t("No match found")}
                </Typography>
              ) : (
                <BlogPostList posts={posts?.data} hideBookmarkButton />
              ))}
          </Box>
        </Stack>
      </Container>
    </BackgroundLayout>
  );
};
export default SearchPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as Locale;

  const pageSettings = await getPageSettings(locale);

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings,
    },
  };
};
