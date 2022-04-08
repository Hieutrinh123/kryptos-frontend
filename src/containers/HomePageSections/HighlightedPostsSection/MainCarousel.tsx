import { carouselTimeout, carouselTransitionTime } from "#/config/carousel";
import { toolbarHeight } from "#/config/toolbar";
import { glassGradientWithAlpha } from "#/styles/gradients";
import { resolveImageUrl } from "@/api";
import { Post } from "@/api";
import { BlurBackdrop } from "@/containers/HomePageSections/HighlightedPostsSection/BlurBackdrop";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getExcerpt } from "@/api";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import NextLink from "next/link";
import { Textfit } from "react-textfit";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MainCarouselProps {
  posts: Post[];
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
      height={`calc(100vh - ${toolbarHeight}px)`}
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

interface MainCarouselItemProps {
  shown: boolean;
  root: HTMLElement | null;
  post: Post;
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
        {post.thumbnail && (
          <Image
            src={resolveImageUrl(post.thumbnail)}
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
  post: Post;
}

const PostDescription: React.FC<PostDescriptionProps> = ({ post }) => {
  const { t } = useTranslation();
  return (
    <Stack
      position="absolute"
      height="100%"
      paddingTop={6}
      paddingBottom={14}
      paddingX={{ mobile: 6, desktop: 0 }}
      left={{ mobile: 0, desktop: "20vh" }}
      width={{ mobile: "100%", tablet: "50vh", desktop: "60vh" }}
      spacing={6}
      alignItems="start"
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        color="white"
        width="100%"
        flexGrow={2}
      >
        <Textfit
          mode="multi"
          max={64}
          style={{ minHeight: "10vh", maxHeight: "40vh" }}
        >
          {post.title}
        </Textfit>
      </Typography>
      <Stack spacing={2} flexGrow={1} alignItems="start">
        {!post.hide_excerpt && (
          <Typography variant="subtitle1" color="white">
            <div dangerouslySetInnerHTML={{ __html: getExcerpt(post) }} />
          </Typography>
        )}
        <NextLink href={`/posts/${post.slug}`} passHref>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "6px", height: "48px" }}
          >
            <span>{t("View More")}</span>
          </Button>
        </NextLink>
      </Stack>
    </Stack>
  );
};
