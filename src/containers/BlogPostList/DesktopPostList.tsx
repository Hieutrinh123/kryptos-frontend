import { BlogPostCardVariant } from "@/containers/BlogCard/BlogPostCard";
import Grid from "@/components/Grid";
import BlogPostCard from "@/containers/BlogCard";
import Box from "@mui/material/Box";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface ComputerAndTabletPostListProps {
  posts: PostsOrPages;
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
