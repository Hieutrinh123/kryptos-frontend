import Grid from "@/components/Grid";
import MainCarousel from "@/containers/HomePageSections/HighlightedPostsSection/MainCarousel";
import SidePosts from "@/containers/HomePageSections/HighlightedPostsSection/SidePosts";
import { PostListingResult } from "@/api/posts";
import React from "react";

interface HighlightedPostsSectionProps {
  posts: PostListingResult;
}

const HighlightedPostsSection: React.FC<HighlightedPostsSectionProps> = ({
  posts,
}) => {
  const postCount = posts.results.length;
  if (posts.results.length < 3) {
    return null;
  }

  const mainPosts = posts.results.slice(0, postCount - 3);
  const sidePosts = posts.results.slice(postCount - 3, postCount);
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

export default HighlightedPostsSection;
