import { getExcerpt, Post } from "@/api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";
import { Textfit } from "react-textfit";

interface MainCarouselPostDescriptionProps {
  post: Post;
}

const MainCarouselPostDescription: React.FC<
  MainCarouselPostDescriptionProps
> = ({ post }) => {
  const { t } = useTranslation();
  return (
    <Stack
      paddingTop={6}
      paddingBottom={14}
      paddingLeft={{ mobile: 6, desktop: "100px" }}
      paddingRight={{ mobile: 6, desktop: "180px" }}
      height="100%"
      width="100%"
      zIndex={10}
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
          style={{ minHeight: "10vh", maxHeight: "30vh" }}
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

export default MainCarouselPostDescription;
