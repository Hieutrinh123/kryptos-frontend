import Grid from "@/components/Grid";
import MainCarousel from "@/containers/HighlightedPosts/MainCarousel";
import SidePosts from "@/containers/HighlightedPosts/SidePosts";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";

interface HighlightedPostsProps {
  posts: PostsOrPages;
}

const HighlightedPosts: React.FC<HighlightedPostsProps> = ({ posts }) => {
  const postCount = posts.length;
  if (posts.length < 3) {
    return null;
  }

  const mainPosts = posts.slice(0, postCount - 3);
  const sidePosts = posts.slice(postCount - 3, postCount);
  return (
    <Grid container spacing={0}>
      <Grid item mobile={12} desktop={9}>
        <MainCarousel posts={mainPosts} />
      </Grid>
      <Grid item mobile={12} desktop={3}>
        <SidePosts posts={sidePosts} />
      </Grid>
    </Grid>
  );
};

export default HighlightedPosts;
