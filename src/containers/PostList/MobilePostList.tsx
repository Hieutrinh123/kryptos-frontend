import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import Slider, { Settings } from "react-slick";

interface MobileListPostProps {
  posts: PostsOrPages;
}

const MobilePostList: React.FC<MobileListPostProps> = ({ posts }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  return (
    <Slider {...settings}>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </Slider>
  );
};

export default MobilePostList;
