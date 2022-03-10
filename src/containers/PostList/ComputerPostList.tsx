import PostGrid from "@/components/PostGrid";
import { Grid } from "@mui/material";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface ComputerListPostProps {
  posts: PostsOrPages;
}

const ComputerPostList: React.FC<ComputerListPostProps> = ({ posts }) => {
  return (
    <Grid container spacing={{ sm: 4, xs: 2 }}>
      {posts.map((post) => (
        <Grid item md={4} sm={6} xs={12} key={post.id}>
          <PostGrid post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ComputerPostList;
