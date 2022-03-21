import { glassGradient } from "#/styles/gradients";
import { useIsDesktop } from "#/styles/responsive";
import Grid from "@/components/Grid";
import AuthorChip from "@/containers/AuthorChip";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostOrPage } from "@tryghost/content-api";
import NextImage from "next/image";
import React from "react";

interface PostBannerProps {
  post: PostOrPage;
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
            <PostTitle post={post} />
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
              {post.feature_image && (
                <NextImage
                  src={post.feature_image}
                  alt={post.feature_image_alt ?? post.title + " thumbnail"}
                  layout="fill"
                  objectFit="cover"
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

const PostTitle: React.FC<{ post: PostOrPage }> = ({ post }) => {
  const isDesktop = useIsDesktop();
  const primaryTag = post.primary_tag;
  return (
    <Container disableGutters={isDesktop}>
      <Stack spacing={2} alignItems="flex-start">
        {primaryTag && (
          <Chip
            label={
              <Typography variant="body1" fontWeight="bold" color="white">
                {primaryTag.name}
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

        {post.primary_author && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="subtitle1">Bài viết được đăng bởi</Typography>
            <AuthorChip author={post.primary_author} />
          </Stack>
        )}
      </Stack>
    </Container>
  );
};
