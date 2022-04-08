import { carouselTransitionTime } from "#/config/carousel";
import { glassGradientWithAlpha } from "#/styles/gradients";
import { useIsMobile } from "#/styles/responsive";
import { Post, resolveImageUrl } from "@/api";
import { BlurBackdrop } from "@/containers/HomePageSections/HighlightedPostsSection/BlurBackdrop";
import MainCarouselPostDescription from "@/containers/HomePageSections/HighlightedPostsSection/MainCarouselPostDescription";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import React from "react";

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
  const isMobile = useIsMobile();
  const size = isMobile ? "120vh" : "150vh";
  const left = isMobile ? "10vw" : "20vw";
  const top = isMobile ? "40vh" : "5vw";

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

        <Box
          height={size}
          width={size}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
          position="relative"
          sx={{
            top,
            left,
            transform: "translate(-50%, -50%)",
          }}
        >
          <BlurBackdrop />
        </Box>
        <Box
          position="absolute"
          top={0}
          maxWidth="100vw"
          width={`calc(${size} / 2 + ${left})`}
          height={`calc(${size} / 2 + ${top})`}
        >
          <MainCarouselPostDescription post={post} />
        </Box>
      </Box>
    </Slide>
  );
};

export default MainCarouselItem;
