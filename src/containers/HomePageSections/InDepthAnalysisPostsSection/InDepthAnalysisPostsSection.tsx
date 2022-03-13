import BlogPostList from "@/components/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface InDepthAnalysisPostsSectionProps {
  posts: PostsOrPages;
}

const InDepthAnalysisPostsSection: React.FC<
  InDepthAnalysisPostsSectionProps
> = ({ posts }) => {
  const postCount = posts.length;
  if (postCount <= 0) {
    return null;
  }
  return (
    <Box paddingY={6}>
      <Container>
        <Stack spacing={3}>
          <Typography variant="h4" mb={3} fontWeight="bolder" align="center">
            Phân tích chuyên sâu
          </Typography>
          <BlogPostList posts={posts} desktopVariant="short" />
        </Stack>
      </Container>
    </Box>
  );
};

export default InDepthAnalysisPostsSection;
