import PostGrid from "@/components/PostGrid";
import Grid from "@/components/Grid";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface ComputerListPostProps {
  posts: PostsOrPages;
}

const ComputerPostList: React.FC<ComputerListPostProps> = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item mobile={12} desktop={4} key={post.id}>
          <PostGrid post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ComputerPostList;
