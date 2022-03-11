import { carouselTimeout, carouselTransitionTime } from "#/config/homepage";
import { glassGradientWithAlpha } from "#/styles/gradients";
import { BlurBackdrop } from "@/containers/HighlightedPosts/BlurBackdrop";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MainCarouselProps {
  posts: PostsOrPages;
}

const MainCarousel: React.FC<MainCarouselProps> = ({ posts }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((oldIndex) => (oldIndex + 1) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    const timer = setTimeout(handleNextSlide, carouselTimeout);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlideIndex, handleNextSlide, posts.length]);

  const rootRef = useRef(null);

  return (
    <Box
      ref={rootRef}
      sx={{ height: "100%", overflow: "hidden", position: "relative" }}
    >
      {posts.map((post, index) => (
        <MainCarouselItem
          key={index}
          shown={index === currentSlideIndex}
          root={rootRef.current}
          post={post}
        />
      ))}

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

export default MainCarousel;

interface MainCarouselItemProps {
  shown: boolean;
  root: HTMLElement | null;
  post: PostOrPage;
}

const MainCarouselItem: React.FC<MainCarouselItemProps> = ({
  shown,
  root,
  post,
}) => {
  return (
    <Slide
      container={root}
      direction={shown ? "up" : "down"}
      in={shown}
      mountOnEnter
      unmountOnExit
      timeout={carouselTransitionTime}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          "& img": {
            filter: "grayscale(100%)",
          },
        }}
      >
        {post?.feature_image && (
          <Image
            src={post?.feature_image}
            alt="Thumbnail"
            layout="fill"
            quality={100}
          />
        )}

        <Box
          sx={{
            position: "absolute",
            top: 0,
            background: glassGradientWithAlpha(0.8),
            height: "100%",
            width: "100%",
            mixBlendMode: "hard-light",
          }}
        />

        <BlurBackdrop />

        <MainCarouselItemDescription post={post} />
      </Box>
    </Slide>
  );
};

interface MainCarouselItemDescriptionProps {
  post: PostOrPage;
}

const MainCarouselItemDescription: React.FC<
  MainCarouselItemDescriptionProps
> = ({ post }) => {
  return (
    <Box position="absolute" top="5vw" left="5vw">
      <Typography variant="h2">{post.title}</Typography>
      <Typography variant="subtitle1">{post.excerpt}</Typography>
    </Box>
  );
};
