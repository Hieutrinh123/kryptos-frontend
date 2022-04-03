import { Post } from "@/api/posts";
import Grid from "@/components/Grid";
import MainCarousel from "@/containers/HomePageSections/HighlightedPostsSection/MainCarousel";
import SidePosts from "@/containers/HomePageSections/HighlightedPostsSection/SidePosts";
import React from "react";

interface FeaturedPostsSectionProps {
  posts: Post[];
}

const FeaturedPostsSection: React.FC<FeaturedPostsSectionProps> = ({
  posts,
}) => {
  const postCount = posts.length;
  if (postCount === 0) {
    return null;
  }
  if (postCount <= 3) {
    return <MainCarousel posts={posts} />;
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

export default FeaturedPostsSection;
