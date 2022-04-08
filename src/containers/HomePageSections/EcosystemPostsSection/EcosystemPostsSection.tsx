import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import BlogPostList from "@/containers/BlogPostList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface EcosystemPostsSectionProps {
  posts: Post[];
}

const EcosystemPostsSection: React.FC<EcosystemPostsSectionProps> = ({
  posts,
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
          <Typography variant="h4" mb={3} fontWeight="bolder" align="center">
            {t("Ecosystem")}
          </Typography>
          <BlogPostList posts={posts} desktopVariant="vertical" />
        </Stack>
      </Container>
    </Box>
  );
};

export default EcosystemPostsSection;
