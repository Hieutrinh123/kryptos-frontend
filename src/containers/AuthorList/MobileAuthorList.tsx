import { carouselTimeout, carouselTransitionTime } from "#/config/carousel";
import AuthorCard from "@/components/AuthorCard";
import Box from "@mui/material/Box";
import { Authors } from "@tryghost/content-api";
import React from "react";
import Slider from "react-slick";

interface MobileAuthorListProps {
  authors: Authors;
}

const MobileAuthorList: React.FC<MobileAuthorListProps> = ({ authors }) => {
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
      {authors.map((author) => (
        <Box key={author.id} paddingX={2}>
          <AuthorCard author={author} variant="detailed" />
        </Box>
      ))}
    </Slider>
  );
};

export default MobileAuthorList;
