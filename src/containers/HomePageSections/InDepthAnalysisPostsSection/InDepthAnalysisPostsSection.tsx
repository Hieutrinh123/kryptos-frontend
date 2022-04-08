import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface InDepthAnalysisPostsSectionProps {
  posts: Post[];
}

const InDepthAnalysisPostsSection: React.FC<
  InDepthAnalysisPostsSectionProps
> = ({ posts }) => {
  const isDesktop = useIsDesktop();
  const postCount = posts.length;
  const { t } = useTranslation();
  if (postCount <= 0) {
    return null;
  }
  return (
    <Box paddingY={6}>
      <Container disableGutters={!isDesktop}>
        <Stack spacing={3}>
          <Typography variant="h4" mb={3} fontWeight="bolder" align="center">
            {t("In-depth Analysis")}
          </Typography>
          <BlogPostList posts={posts} desktopVariant="vertical" />
        </Stack>
      </Container>
    </Box>
  );
};

export default InDepthAnalysisPostsSection;
