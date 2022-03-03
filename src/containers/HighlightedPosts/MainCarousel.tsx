import { alpha } from "@mui/material/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mainThumbnail from "#/assets/main-thumbnail.avif";
import { carouselTimeout, carouselTransitionTime } from "#/config/homepage";
import { glassGradientWithAlpha } from "#/styles/gradients";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

interface MainCarouselProps {}

const MainCarousel: React.FC<MainCarouselProps> = ({}) => {
  const items = [0, 1, 2];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((oldIndex) => (oldIndex + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setTimeout(handleNextSlide, carouselTimeout);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlideIndex, handleNextSlide, items.length]);

  const rootRef = useRef(null);

  return (
    <Box
      ref={rootRef}
      sx={{ height: "100%", overflow: "hidden", position: "relative" }}
    >
      {items.map((item, index) => (
        <MainCarouselItem
          key={index}
          shown={index === currentSlideIndex}
          root={rootRef.current}
        />
      ))}

      <Box
        position="absolute"
        borderRadius="50%"
        height="1000px"
        width="1000px"
        sx={(theme) => ({
          top: 20,
          left: 100,
          transform: "translate(-50%, -50%)",
          backgroundColor: alpha(theme.palette.grey["800"], 0.75),
          backgroundBlendMode: "blur",
          mixBlendMode: "normal",
          backdropFilter: "blur(50px)",
        })}
      >
        <h1>Lorem Ipsum</h1>
      </Box>

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
    </Box>
  );
};

interface MainCarouselItemProps {
  shown: boolean;
  root: HTMLElement | null;
}

const MainCarouselItem: React.FC<MainCarouselItemProps> = ({ shown, root }) => {
  return (
    <Slide
      container={root}
      direction={shown ? "up" : "down"}
      in={shown}
      mountOnEnter
      unmountOnExit
      timeout={carouselTransitionTime}
    >
      <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
        <Image src={mainThumbnail} alt="Thumbnail" layout="responsive" />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            background: glassGradientWithAlpha(0.8),
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </Slide>
  );
};

export default MainCarousel;
