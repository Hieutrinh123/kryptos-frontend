import { toolbarHeight } from "#/config/toolbar";
import { grey } from "#/styles/colors";
import { useIsMobile } from "#/styles/responsive";
import { resolveImageUrl } from "@/api/directus";
import { getExcerpt } from "@/api/posts";
import { Post } from "@/api/types";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import NextLink from "next/link";
import React, { useRef, useState } from "react";

interface SidePostsProps {
  posts: Post[];
}

const SidePosts: React.FC<SidePostsProps> = ({ posts }) => {
  return (
    <Stack spacing={0} direction={{ mobile: "row", desktop: "column" }}>
      {posts.map((post) => (
        <SingleSidePost post={post} key={post.id} />
      ))}
    </Stack>
  );
};

interface SingleSidePostProps {
  post: Post;
}
const SingleSidePost: React.FC<SingleSidePostProps> = ({ post }) => {
  const isMobile = useIsMobile();
  const [hover, setHover] = useState(false);
  const containerRef = useRef();
  return (
    <Box
      minHeight={`calc((100vh - ${toolbarHeight}px) / 3)`}
      width="100%"
      position="relative"
      overflow="hidden"
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <NextLink href={`/posts/${post.slug}`} passHref>
        <a>
          {post.posts_id.thumbnail && (
            <NextImage
              src={resolveImageUrl(post.posts_id.thumbnail)}
              alt={post.posts_id.thumbnail.description ?? "thumbnail"}
              layout="fill"
              objectFit="cover"
            />
          )}
          <Slide
            direction={hover ? "down" : "up"}
            in={!hover}
            container={containerRef.current}
          >
            <Box
              padding={4}
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignItems="center"
              position="absolute"
              height="100%"
              width="100%"
              bgcolor={alpha(grey[500], 0.5)}
            >
              <Typography
                color="white"
                variant={isMobile ? "h6" : "h4"}
                fontWeight="bold"
              >
                {post.title}
              </Typography>
            </Box>
          </Slide>

          <Slide
            direction={hover ? "up" : "down"}
            in={hover}
            container={containerRef.current}
          >
            <Box
              padding={4}
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignItems="center"
              position="absolute"
              height="100%"
              width="100%"
              bgcolor={alpha(grey[500], 0.8)}
            >
              <Typography color="white" variant="body1">
                {getExcerpt(post)}
              </Typography>
            </Box>
          </Slide>
        </a>
      </NextLink>
    </Box>
  );
};

export default SidePosts;
