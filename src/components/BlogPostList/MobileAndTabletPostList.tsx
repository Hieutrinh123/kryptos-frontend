import {carouselTimeout, carouselTransitionTime} from "#/config/homepage";
import BlogCard from "@/components/BlogCard";
import Box from "@mui/material/Box";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import Slider from "react-slick";

interface MobileAndTabletPostListProps {
  posts: PostsOrPages;
}

const MobileAndTabletPostList: React.FC<MobileAndTabletPostListProps> = ({
  posts,
}) => {
  return (
    <Slider
      dots
      autoplay
      autoplaySpeed={carouselTimeout}
      arrows={false}
      infinite
      centerMode
      centerPadding="10%"
      speed={carouselTransitionTime}
      slidesToShow={1}
      slidesToScroll={1}
      initialSlide={2}
    >
      {posts.map((post) => (
        <Box key={post.id} paddingX={2}>
          <BlogCard post={post} variant="short" />
        </Box>
      ))}
    </Slider>
  );
};

export default MobileAndTabletPostList;
