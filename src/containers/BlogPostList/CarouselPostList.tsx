import { carouselTimeout, carouselTransitionTime } from "#/config/carousel";
import { Post } from "@/api";
import BlogPostCard from "@/containers/BlogCard";
import Box from "@mui/material/Box";
import React from "react";
import Slider from "react-slick";

interface CarouselPostListProps {
  posts: Post[];
}

const CarouselPostList: React.FC<CarouselPostListProps> = ({ posts }) => {
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
        <Box key={post.id} padding={2}>
          <BlogPostCard post={post} variant="vertical" />
        </Box>
      ))}
    </Slider>
  );
};

export default CarouselPostList;
