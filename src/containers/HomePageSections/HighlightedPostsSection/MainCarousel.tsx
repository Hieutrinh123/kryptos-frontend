import { carouselTimeout } from "#/config/carousel";
import { useToolbarHeight } from "#/config/toolbar";
import { Post } from "@/api";
import MainCarouselItem from "./MainCarouselItem";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MainCarouselProps {
  posts: Post[];
}

const MainCarousel: React.FC<MainCarouselProps> = ({ posts }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const toolbarHeight = useToolbarHeight();

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((oldIndex) => (oldIndex + 1) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    if (carouselTimeout > 0) {
      const timer = setTimeout(handleNextSlide, carouselTimeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentSlideIndex, handleNextSlide, posts.length]);

  const rootRef = useRef(null);

  return (
    <Box
      ref={rootRef}
      height={`calc(100vh - ${toolbarHeight}px)`}
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      {posts.map((post, index) => (
        <MainCarouselItem
          key={index}
          first={index === 0}
          shown={index === currentSlideIndex}
          root={rootRef.current}
          post={post}
        />
      ))}

      {posts.length > 1 && (
        <IconButton
          onClick={handleNextSlide}
          color="primary"
          size="large"
          sx={(theme) => ({
            color: theme.palette.mode === "light" ? "black" : "white",
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
          })}
        >
          <KeyboardArrowDown />
        </IconButton>
      )}
    </Box>
  );
};

export default MainCarousel;
