import BlogCard from "./BlogCard";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import Slider from "react-slick";

interface MobileListPostProps {
  posts: PostsOrPages;
}

const MobilePostList: React.FC<MobileListPostProps> = ({ posts }) => {
  return (
    <Slider
      dots
      autoplay
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      initialSlide={2}
    >
      {posts.map((post) => (
        <BlogCard post={post} key={post.id} />
      ))}
    </Slider>
  );
};

export default MobilePostList;
