import { REVALIDATE_STATIC_FILE_TIME } from "#/config/caching";
import { useIsDesktop, useIsMobile } from "#/styles/responsive";
import { getPageSettings } from "@/api";
import { getPostBySlug, listAllPostSlugs } from "@/api";
import { Locale, Post } from "@/api";
import AuthorInformation from "@/containers/AuthorInformation";
import BlogBookmarkButton from "@/containers/BlogBookmarkButton";
import BlogLikeButton from "@/containers/BlogLikeButton";
import CommentListing from "@/containers/CommentListing";
import PostBanner from "@/containers/PostBanner";
import PostContent from "@/containers/PostContent";
import PostTableOfContent from "@/containers/PostTableOfContent";
import SocialLinks from "@/containers/SocialLinks";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import FullLayout from "@/layouts/FullLayout";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

interface BlogViewPageProps {
  post: Post;
}

const BlogViewPage: NextPage<BlogViewPageProps> = ({ post }) => {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const { user } = useFirebaseAuthState();
  const { t } = useTranslation();
  if (!post) {
    return null;
  }

  return (
    <FullLayout>
      <PostBanner post={post} />
      <Container
        disableGutters={!isDesktop}
        sx={{ paddingTop: 4, paddingBottom: 6 }}
      >
        <Stack direction={{ mobile: "column", desktop: "row" }} spacing={4}>
          <Box flex={3}>
            <Stack spacing={3}>
              <Card
                sx={(theme) => ({
                  padding: 6,
                  [theme.breakpoints.down("desktop")]: {
                    padding: 3,
                  },
                })}
              >
                <Box marginBottom={6}>
                  <PostContent content={post.content} />
                </Box>
                <AuthorInformation
                  author={post.author}
                  variant="compact"
                  withoutPaper
                />
              </Card>
              <Card sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  {user && (
                    <Stack direction="row" spacing={2}>
                      <BlogBookmarkButton
                        post={post}
                        variant={isMobile ? "compact" : "full"}
                      />
                      <BlogLikeButton
                        post={post}
                        variant={isMobile ? "compact" : "full"}
                      />
                    </Stack>
                  )}
                  <Typography variant="h6" fontWeight="bolder">
                    {t("Reader's Comments")}
                  </Typography>
                  <CommentListing post={post} />
                </Stack>
              </Card>
            </Stack>
          </Box>

          <Box flex={1}>
            <PostSideBar post={post} />
          </Box>
        </Stack>
      </Container>
    </FullLayout>
  );
};

interface PostSideBarProps {
  post: Post;
}

const PostSideBar: React.FC<PostSideBarProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={4} position="sticky" top={100}>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h6" mb={2}>
          {t("Share")}
        </Typography>
        <SocialLinks />
      </Card>

      <Card sx={{ padding: 3 }}>
        <Typography variant="h6" mb={2}>
          {t("Table of Contents")}
        </Typography>
        <PostTableOfContent post={post} />
      </Card>

      <Card sx={{ padding: 3 }}>
        <Typography variant="h6" mb={2}>
          {t("Tags")}
        </Typography>
        <Stack direction="row" flexWrap="wrap">
          <Box paddingRight={2} paddingBottom={2}>
            {post.categories?.map((category) => (
              <Box paddingRight={2} paddingBottom={2} key={category.slug}>
                <Chip label={category.name} />
              </Box>
            ))}
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
};

export default BlogViewPage;

export const getStaticProps: GetStaticProps<BlogViewPageProps> = async (
  context
) => {
  const postSlug = context.params?.postSlug;
  if (!postSlug) {
    return {
      notFound: true,
    };
  }
  const post = await getPostBySlug(postSlug as string);
  if (_.isNil(post)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
      post,
    },
    revalidate: REVALIDATE_STATIC_FILE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await listAllPostSlugs();
  return {
    paths: postSlugs.map((postSlug) => ({ params: { postSlug } })),
    fallback: true,
  };
};
