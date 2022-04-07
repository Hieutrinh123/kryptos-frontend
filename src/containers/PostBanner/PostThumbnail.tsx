import { Post, resolveImageUrl } from "@/api";
import Box from "@mui/material/Box";
import NextImage from "next/image";
import React from "react";

interface PostThumbnailProps {
  post: Post;
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ post }) => {
  const thumbnail = post.thumbnail;
  if (!thumbnail) {
    return null;
  }
  const { height: realHeight, width: realWidth } = thumbnail;
  return (
    <Box
      position="relative"
      width="100%"
      borderRadius={6}
      sx={(theme) => ({
        [theme.breakpoints.up("desktop")]: {
          overflow: "hidden",
        },
        aspectRatio: `${realWidth} / ${realHeight}`,
      })}
    >
      <NextImage
        src={resolveImageUrl(thumbnail)}
        alt={thumbnail.description ?? post.title + "'s thumbnail"}
        layout="fill"
        objectFit="cover"
      />
    </Box>
  );
};

export default PostThumbnail;
