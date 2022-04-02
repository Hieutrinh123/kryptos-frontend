import { useIsDesktop } from "#/styles/responsive";
import BlogPostCard from "@/containers/BlogCard";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostListingResult } from "@/api/posts";
import { useTranslation } from "next-i18next";
import React from "react";

interface UpdatePostsSectionProps {
  posts: PostListingResult;
}

const UpdatePostsSection: React.FC<UpdatePostsSectionProps> = ({ posts }) => {
  const isDesktop = useIsDesktop();
  const { t } = useTranslation();
  const postCount = posts.results.length;
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
                {t("Newest Updates")}
              </Typography>
            </Box>
            {isDesktop && (
              <Box flex={8}>
                <BlogPostCard
                  post={posts.results[0]}
                  variant="side"
                  imageWidth={250}
                />
              </Box>
            )}
          </Stack>

          <BlogPostList
            posts={
              isDesktop
                ? posts.results.slice(1, posts.results.length)
                : posts.results
            }
            desktopVariant="side"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UpdatePostsSection;
