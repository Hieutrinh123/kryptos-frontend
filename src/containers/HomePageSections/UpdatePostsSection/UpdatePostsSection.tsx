import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api/types";
import BlogPostCard from "@/containers/BlogCard";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface UpdatePostsSectionProps {
  posts: Post[];
  title?: string;
}

const UpdatePostsSection: React.FC<UpdatePostsSectionProps> = ({
  posts,
  title = "Newest Updates",
}) => {
  const isDesktop = useIsDesktop();
  const { t } = useTranslation();
  const postCount = posts.length;
  if (postCount <= 0) {
    return null;
  }

  return (
    <Box paddingY={6}>
      <Container disableGutters={!isDesktop}>
        <Stack spacing={3}>
          <Stack direction="row">
            <Box flex={4} paddingX={isDesktop ? 0 : 4}>
              <Typography
                variant={isDesktop ? "h2" : "h3"}
                mb={3}
                fontWeight="bolder"
              >
                {t(title)}
              </Typography>
            </Box>
            {isDesktop && (
              <Box flex={8}>
                <BlogPostCard post={posts[0]} variant="side" imageWidth={250} />
              </Box>
            )}
          </Stack>

          <BlogPostList
            posts={isDesktop ? posts.slice(1, posts.length) : posts}
            desktopVariant="side"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UpdatePostsSection;
