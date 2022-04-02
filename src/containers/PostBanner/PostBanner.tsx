import { glassGradient } from "#/styles/gradients";
import { useIsDesktop } from "#/styles/responsive";
import { resolveImageUrl } from "@/api/strapi";
import Grid from "@/components/Grid";
import PostStatistic from "@/containers/PostStatistic";
import AuthorChip from "@/containers/AuthorChip";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Post } from "@/api/posts";
import NextImage from "next/image";
import React from "react";
import NextLink from "next/link";

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
            <Stack spacing={3}>
              <PostTitle post={post} />
              <PostStatistic post={post} />
              <PostLocalizationLinks post={post} />
            </Stack>
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
                  alt={post.thumbnail.alternativeText ?? "Post's thumbnail"}
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
  const isDesktop = useIsDesktop();
  return (
    <Container disableGutters={isDesktop}>
      <Stack spacing={2} alignItems="flex-start">
        {post.category && (
          <Chip
            label={
              <Typography variant="body1" fontWeight="bold" color="white">
                {post.category.title}
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
          <Typography variant="subtitle1">Bài viết được đăng bởi</Typography>
          <AuthorChip author={post.author} />
        </Stack>
      </Stack>
    </Container>
  );
};

const PostLocalizationLinks: React.FC<{ post: Post }> = ({ post }) => {
  if (!post.localizations || post.localizations.length === 0) {
    return null;
  }

  return (
    <Stack spacing={1}>
      <Typography fontWeight="bolder">Các bản dịch của bài viết</Typography>
      {post.localizations.map((localization) => (
        <NextLink
          key={localization.id}
          href={`/posts/${localization.slug}`}
          passHref
          locale={localization.locale}
        >
          <Link>{localization.locale}</Link>
        </NextLink>
      ))}
    </Stack>
  );
};
