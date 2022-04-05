import { glassGradient } from "#/styles/gradients";
import { useIsDesktop } from "#/styles/responsive";
import { resolveImageUrl } from "@/api";
import { Post } from "@/api";
import Grid from "@/components/Grid";
import AuthorChip from "@/containers/AuthorChip";
import PostStatistic from "@/containers/PostStatistic";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import React from "react";

interface PostBannerProps {
  post: Post;
}

const PostBanner: React.FC<PostBannerProps> = ({ post }) => {
  const isDesktop = useIsDesktop();

  return (
    <Box paddingTop={4} paddingBottom={6} bgcolor="background.secondary">
      <Container disableGutters={!isDesktop}>
        <Grid
          container
          direction={{ mobile: "column-reverse", desktop: "row" }}
          alignItems={{ mobile: "flex-start", desktop: "center" }}
          rowSpacing={6}
        >
          <Grid item mobile={12} tablet={6}>
            <Container disableGutters={isDesktop}>
              <Stack spacing={3}>
                <PostTitle post={post} />
                <PostStatistic post={post} />
              </Stack>
            </Container>
          </Grid>
          <Grid item mobile={12} tablet={6} width="100%">
            <Box
              width="100%"
              height="400px"
              position="relative"
              sx={(theme) => ({
                overflow: "none",
                [theme.breakpoints.up("desktop")]: {
                  overflow: "hidden",
                },
              })}
              borderRadius={6}
            >
              {post.thumbnail && (
                <NextImage
                  src={resolveImageUrl(post.thumbnail)}
                  alt={post.thumbnail.description ?? "Post's thumbnail"}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PostBanner;

const PostTitle: React.FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} alignItems="flex-start">
      {post.categories && (
        <Chip
          label={
            <Typography variant="body1" fontWeight="bold" color="white">
              {t(post.categories[0].name)}
            </Typography>
          }
          sx={(theme) => ({
            padding: theme.spacing(2, 4),
            background: glassGradient,
          })}
        />
      )}

      <Typography variant="h2" fontWeight="bolder">
        {post.title}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography variant="subtitle1">{t("Post published by")}</Typography>
        <AuthorChip author={post.author} />
      </Stack>
    </Stack>
  );
};
