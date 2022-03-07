import React from "react";
import Slider, { Settings } from "react-slick";
import { PostItem } from "./data";

interface MobileListPostProps {
  listPosts: PostItem[];
}

const MobileListPost: React.FC<MobileListPostProps> = ({ listPosts }) => {
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
      {listPosts.map((post) => (
        <div key={post.id}>
          <p>hello</p>
        </div>
      ))}
    </Slider>
  );
};

export default MobileListPost;
