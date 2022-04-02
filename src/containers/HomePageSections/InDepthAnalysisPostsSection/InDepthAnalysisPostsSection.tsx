import { useIsDesktop } from "#/styles/responsive";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostListingResult } from "@/api/posts";
import React from "react";

interface InDepthAnalysisPostsSectionProps {
  posts: PostListingResult;
}

const InDepthAnalysisPostsSection: React.FC<
  InDepthAnalysisPostsSectionProps
> = ({ posts }) => {
  const isDesktop = useIsDesktop();
  const postCount = posts.results.length;
  if (postCount <= 0) {
    return null;
  }
  return (
    <Box paddingY={6}>
      <Container disableGutters={!isDesktop}>
        <Stack spacing={3}>
          <Typography variant="h4" mb={3} fontWeight="bolder" align="center">
            Phân tích chuyên sâu
          </Typography>
          <BlogPostList posts={posts.results} desktopVariant="short" />
        </Stack>
      </Container>
    </Box>
  );
};

export default InDepthAnalysisPostsSection;
