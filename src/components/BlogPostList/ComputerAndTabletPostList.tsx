import Grid from "@/components/Grid";
import BlogCard from "./BlogCard";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface ComputerAndTabletPostListProps {
  posts: PostsOrPages;
}

const ComputerAndTabletPostList: React.FC<ComputerAndTabletPostListProps> = ({
  posts,
}) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item mobile={12} tablet={6} desktop={4} key={post.id}>
          <BlogCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ComputerAndTabletPostList;
