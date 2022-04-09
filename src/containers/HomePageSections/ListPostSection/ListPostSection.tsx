import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface ListPostsSectionProps {
  title: string;
  posts: Post[];
}

const ListPostsSection: React.FC<ListPostsSectionProps> = ({
  posts,
  title,
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
          <Typography
            variant="h2"
            fontSize={{ mobile: 28, tablet: 48 }}
            mb={3}
            fontWeight="bolder"
            align="center"
          >
            {title}
          </Typography>
          <BlogPostList posts={posts} desktopVariant="vertical" />
        </Stack>
      </Container>
    </Box>
  );
};

export default ListPostsSection;
