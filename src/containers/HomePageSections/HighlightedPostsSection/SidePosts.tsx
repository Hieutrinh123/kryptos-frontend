import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import React from "react";

interface SidePostsProps {
  posts: PostOrPage[];
}

const SidePosts: React.FC<SidePostsProps> = ({ posts }) => {
  return (
    <Stack spacing={0} direction={{ mobile: "row", desktop: "column" }}>
      {posts.map((post) => (
        <Box key={post.id} minHeight="200px" width="100%" position="relative">
          {post.feature_image && (
            <Image
              src={post.feature_image}
              alt={post.feature_image_alt ?? "thumbnail"}
              layout="fill"
              objectFit="cover"
            />
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default SidePosts;
