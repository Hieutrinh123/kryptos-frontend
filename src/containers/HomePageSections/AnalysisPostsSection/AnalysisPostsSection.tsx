import { useIsMobile } from "#/styles/responsive";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface AnalysisPostsSectionProps {
  posts: PostsOrPages;
}

const AnalysisPostsSection: React.FC<AnalysisPostsSectionProps> = ({
  posts,
}) => {
  const isMobile = useIsMobile();
  const postCount = posts.length;
  if (postCount <= 0) {
    return null;
  }
  return (
    <Box paddingY={6}>
      <Container disableGutters={isMobile}>
        <Stack spacing={3}>
          <Typography variant="h4" mb={3} fontWeight="bolder" align="center">
            Phân tích dự án
          </Typography>
          <BlogPostList posts={posts} desktopVariant="tall" />
        </Stack>
      </Container>
    </Box>
  );
};

export default AnalysisPostsSection;
