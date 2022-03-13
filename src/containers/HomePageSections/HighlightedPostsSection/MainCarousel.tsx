import { carouselTimeout, carouselTransitionTime } from "#/config/homepage";
import { toolbarHeight } from "#/config/toolbar";
import { glassGradientWithAlpha } from "#/styles/gradients";
import { limitParagraphWordCount } from "#/utils/limitParagraphWordCount";
import { BlurBackdrop } from "@/containers/HomePageSections/HighlightedPostsSection/BlurBackdrop";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import NextLink from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MainCarouselProps {
  posts: PostOrPage[];
}

const MainCarousel: React.FC<MainCarouselProps> = ({ posts }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
      height={{ mobile: `calc(100vh - ${toolbarHeight}px)`, desktop: "100%" }}
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
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
            objectFit="cover"
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

        <PostDescription post={post} />
      </Box>
    </Slide>
  );
};

interface PostDescriptionProps {
  post: PostOrPage;
}

const PostDescription: React.FC<PostDescriptionProps> = ({ post }) => {
  return (
    <Stack
      position="absolute"
      top={{ mobile: "30vh", desktop: "20vh" }}
      left={{ mobile: "5vh", desktop: "20vh" }}
      maxWidth="50vh"
      spacing={2}
      alignItems="start"
    >
      <Typography variant="h1" fontWeight="bold" color="white">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="white">
        {limitParagraphWordCount(post.excerpt ?? "")}
      </Typography>
      <NextLink href={`/posts/${post.slug}`} passHref>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "6px", height: "48px" }}
        >
          <span>Xem thêm</span>
        </Button>
      </NextLink>
    </Stack>
  );
};
