import { toolbarHeight } from "#/config/toolbar";
import { grey } from "#/styles/colors";
import { useIsMobile } from "#/styles/responsive";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { PostOrPage } from "@tryghost/content-api";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";

interface SidePostsProps {
  posts: PostOrPage[];
}

const SidePosts: React.FC<SidePostsProps> = ({ posts }) => {
  const isMobile = useIsMobile();
  return (
    <Stack spacing={0} direction={{ mobile: "row", desktop: "column" }}>
      {posts.map((post) => (
        <Box
          key={post.id}
          minHeight={`calc((100vh - ${toolbarHeight}px) / 3)`}
          width="100%"
          position="relative"
        >
          <NextLink href={`/posts/${post.slug}`} passHref>
            <a>
              {post.feature_image && (
                <NextImage
                  src={post.feature_image}
                  alt={post.feature_image_alt ?? "thumbnail"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <Box
                height="100%"
                width="100%"
                position="absolute"
                bgcolor={alpha(grey[500], 0.5)}
                display="flex"
                justifyContent="start"
                alignItems="center"
                padding={4}
              >
                <Typography
                  color="white"
                  variant={isMobile ? "h6" : "h4"}
                  fontWeight="bold"
                >
                  {post.title}
                </Typography>
              </Box>
            </a>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

export default SidePosts;
