import { Post } from "@/api/posts";
import Grid from "@/components/Grid";
import BlogPostCard from "@/containers/BlogCard";
import { BlogPostCardVariant } from "@/containers/BlogCard/BlogPostCard";
import Box from "@mui/material/Box";
import React from "react";

interface ComputerAndTabletPostListProps {
  posts: Post[];
  variant: BlogPostCardVariant;
}

const DesktopPostList: React.FC<ComputerAndTabletPostListProps> = ({
  posts,
  variant,
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid
            item
            mobile={12}
            tablet={6}
            desktop={variant === "side" ? 6 : 4}
            key={post.id}
          >
            <BlogPostCard post={post} variant={variant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DesktopPostList;
