import mainThumbnail from "#/assets/main-thumbnail.avif";
import Grid from "@/components/Grid";
import MainCarousel from "@/containers/HighlightedPosts/MainCarousel";
import { Stack } from "@mui/material";
import { PostsOrPages } from "@tryghost/content-api";
import Image from "next/image";
import React from "react";

interface HighlightedPostsProps {
  posts: PostsOrPages;
}

const HighlightedPosts: React.FC<HighlightedPostsProps> = ({ posts }) => {
  return (
    <Grid container spacing={0}>
      <Grid item mobile={9}>
        <MainCarousel posts={posts} />
      </Grid>
      <Grid item mobile={3}>
        <Stack spacing={0}>
          <Image src={mainThumbnail} alt="Thumbnail" layout="responsive" />
          <Image src={mainThumbnail} alt="Thumbnail" layout="responsive" />
          <Image src={mainThumbnail} alt="Thumbnail" layout="responsive" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HighlightedPosts;
