import { useIsDesktop } from "#/styles/responsive";
import BlogPostList from "@/components/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface EcosystemPostsSectionProps {
  posts: PostsOrPages;
}

const EcosystemPostsSection: React.FC<EcosystemPostsSectionProps> = ({
  posts,
}) => {
  const isDesktop = useIsDesktop();

  const postCount = posts.length;
  if (postCount <= 0) {
    return null;
  }
  return (
    <Box paddingY={6}>
      <Container disableGutters={!isDesktop}>
        <Stack spacing={3}>
          <Typography variant="h4" mb={3} fontWeight="bolder" align="center">
            Hệ sinh thái
          </Typography>
          <BlogPostList posts={posts} desktopVariant="short" />
        </Stack>
      </Container>
    </Box>
  );
};

export default EcosystemPostsSection;
