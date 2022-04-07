import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import Grid from "@/components/Grid";
import PostThumbnail from "@/containers/PostBanner/PostThumbnail";
import PostStatistic from "@/containers/PostStatistic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import React from "react";
import PostTitle from "./PostTitle";

interface PostBannerProps {
  post: Post;
}
const PostBanner: React.FC<PostBannerProps> = ({ post }) => {
  const isDesktop = useIsDesktop();
  return (
    <Box paddingTop={4} paddingBottom={6} bgcolor="background.secondary">
      <Container maxWidth="xl" disableGutters={!isDesktop}>
        <Grid
          container
          direction={{ mobile: "column-reverse", desktop: "row" }}
          alignItems={{ mobile: "flex-start", desktop: "center" }}
          paddingLeft={{ mobile: 0, desktop: 6 }}
          rowSpacing={6}
          columnSpacing={1}
        >
          <Grid item mobile={12} desktop={4}>
            <Container disableGutters={isDesktop}>
              <Stack spacing={3}>
                <PostTitle post={post} />
                <PostStatistic post={post} />
              </Stack>
            </Container>
          </Grid>
          <Grid item mobile={0} desktop={1} />
          <Grid
            item
            mobile={12}
            desktop={7}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            {post.thumbnail && <PostThumbnail post={post} />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PostBanner;
