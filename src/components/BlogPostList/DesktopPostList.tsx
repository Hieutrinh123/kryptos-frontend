import { BlogCardVariant } from "@/components/BlogCard/BlogCard";
import Grid from "@/components/Grid";
import BlogCard from "@/components/BlogCard";
import Box from "@mui/material/Box";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface ComputerAndTabletPostListProps {
  posts: PostsOrPages;
  variant: BlogCardVariant;
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
            <BlogCard post={post} variant={variant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DesktopPostList;
