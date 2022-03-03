import mainThumbnail from "#/assets/main-thumbnail.avif";
import MainCarousel from "@/containers/HighlightedPosts/MainCarousel";
import { Grid, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

interface HighlightedPostsProps {}

const HighlightedPosts: React.FC<HighlightedPostsProps> = ({}) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={9}>
        <MainCarousel />
      </Grid>
      <Grid item xs={3}>
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
