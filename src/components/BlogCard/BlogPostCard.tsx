import { textColorGradient } from "#/styles/gradients";
import { useIsMobile } from "#/styles/responsive";
import AuthorAvatar from "@/components/AuthorAvatar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostOrPage } from "@tryghost/content-api";
import NextLink from "next/link";
import React from "react";

interface BlogPostCard {
  post: PostOrPage;
  variant?: BlogPostCardVariant;
  imageWidth?: number;
}

export type BlogPostCardVariant = "side" | "tall" | "short";

const BlogPostCard: React.FC<BlogPostCard> = ({
  post,
  variant = "short",
  imageWidth = 200,
}) => {
  const isMobile = useIsMobile();
  return (
    <NextLink href={"/posts/" + post.slug} passHref>
      <a>
        <Card>
          <Stack
            direction={variant === "side" ? "row" : "column"}
            alignItems="stretch"
            position="relative"
          >
            <CardMedia
              component="img"
              src={post.feature_image ?? undefined}
              sx={{
                aspectRatio: variant === "short" ? "2 / 1" : "1 / 1",
                width: variant === "side" ? imageWidth : undefined,
              }}
            />
            {isMobile && (
              <Box position="absolute" top={10} right={10}>
                <BlogBookmarkButton />
              </Box>
            )}

            <CardContent
              sx={(theme) => ({
                padding: `${theme.spacing(2, 3, 2)} !important`,
                flexGrow: 1,
              })}
            >
              <Stack spacing={1} height="100%">
                <Stack spacing={1} flexGrow={1}>
                  <Typography variant="subtitle1" sx={{ ...textColorGradient }}>
                    {post.primary_tag?.name}
                  </Typography>
                  <Typography variant="h5" fontWeight="bolder">
                    {post.title}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    flexGrow={1}
                    alignItems="center"
                  >
                    {post.primary_author && (
                      <>
                        <AuthorAvatar
                          author={post.primary_author}
                          sx={{ maxWidth: "24px", height: "24px" }}
                        />
                        <Typography variant="subtitle1">
                          {post.primary_author.name ?? "Author"}
                        </Typography>
                      </>
                    )}

                    <Typography color="text.disabled">•</Typography>

                    <Typography variant="subtitle1" color="text.disabled">
                      {post.published_at &&
                        new Date(post.published_at).toLocaleDateString()}
                    </Typography>
                  </Stack>
                  {!isMobile && <BlogBookmarkButton />}
                </Stack>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </a>
    </NextLink>
  );
};

export const BlogBookmarkButton: React.FC = () => {
  return (
    <IconButton
      color="primary"
      onClick={(event) => {
        event.preventDefault();
        alert("bookmarked");
      }}
    >
      <BookmarkBorderIcon />
    </IconButton>
  );
};

export default BlogPostCard;
