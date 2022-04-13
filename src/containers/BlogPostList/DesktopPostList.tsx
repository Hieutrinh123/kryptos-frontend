import { Post } from "@/api";
import Grid from "@/components/Grid";
import BlogPostCard from "@/containers/BlogCard";
import { BlogPostCardVariant } from "@/containers/BlogCard/BlogPostCard";
import Box from "@mui/material/Box";
import React from "react";

interface ComputerAndTabletPostListProps {
  posts: Post[];
  variant: BlogPostCardVariant;
  hideBookmarkButton?: boolean;
}

const DesktopPostList: React.FC<ComputerAndTabletPostListProps> = ({
  posts,
  variant,
  hideBookmarkButton,
}) => {
  return (
    <Box>
      <Grid container spacing={2} alignItems="stretch">
        {posts.map((post) => (
          <Grid
            item
            mobile={12}
            tablet={6}
            desktop={variant === "horizontal" ? 6 : 4}
            key={post.id}
          >
            <BlogPostCard
              post={post}
              variant={variant}
              hideBookmarkButton={hideBookmarkButton}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DesktopPostList;
