import { useIsDesktop } from "#/styles/responsive";
import { sliceBrowseResult } from "#/utils/sliceBrowseResult";
import BlogCard from "@/components/BlogCard";
import BlogPostList from "@/components/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface UpdatePostsSectionProps {
  posts: PostsOrPages;
}

const UpdatePostsSection: React.FC<UpdatePostsSectionProps> = ({ posts }) => {
  const isDesktop = useIsDesktop();
  const postCount = posts.length;
  if (postCount <= 0) {
    return null;
  }
  return (
    <Box paddingY={6}>
      <Container>
        <Stack spacing={3}>
          <Stack direction="row">
            <Box flex={5}>
              <Typography
                variant={isDesktop ? "h2" : "h4"}
                mb={3}
                fontWeight="bolder"
              >
                Những cập nhật mới nhất
              </Typography>
            </Box>
            {isDesktop && (
              <Box flex={7}>
                <BlogCard post={posts[0]} variant="side" />
              </Box>
            )}
          </Stack>

          <BlogPostList
            posts={isDesktop ? sliceBrowseResult(posts, 1, postCount) : posts}
            desktopVariant="side"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UpdatePostsSection;
