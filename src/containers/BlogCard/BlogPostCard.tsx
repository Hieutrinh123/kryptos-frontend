import { textColorGradient } from "#/styles/gradients";
import { useIsMobile } from "#/styles/responsive";
import { getAuthorName, Post, resolveImageUrl } from "@/api";
import { grey } from "@/common/styles/colors";
import AuthorAvatar from "@/containers/AuthorAvatar";
import BlogBookmarkButton from "@/containers/BlogBookmarkButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";

interface BlogPostCard {
  post: Post;
  variant?: BlogPostCardVariant;
  imageWidth?: number;
}

export type BlogPostCardVariant = "horizontal" | "vertical";

const BlogPostCard: React.FC<BlogPostCard> = ({
  post,
  variant = "short",
  imageWidth = 200,
}) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <Card
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? grey["700"] : "white",
        boxShadow: 3,
        cursor: "pointer",
        ":hover": {
          boxShadow: 5,
        },
        height: "100%",
      })}
      onClick={() => router.push(`/posts/${post.slug}`)}
    >
      <Stack
        direction={variant === "horizontal" ? "row" : "column"}
        alignItems="stretch"
        position="relative"
        height="100%"
      >
        <CardMedia
          component="img"
          src={resolveImageUrl(post.thumbnail)}
          sx={(theme) => ({
            [theme.breakpoints.down("tablet")]: {
              aspectRatio: "1 / 1",
            },
            boxShadow: 1,
            aspectRatio: variant === "horizontal" ? "1 / 1" : "2 / 1",
            width: variant === "horizontal" ? imageWidth : undefined,
          })}
        />
        {isMobile && (
          <Box position="absolute" top={10} right={10}>
            <BlogBookmarkButton post={post} variant="compact" />
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
              {post.categories.length > 0 && (
                <Typography variant="subtitle1" sx={{ ...textColorGradient }}>
                  {post.categories[0].name}
                </Typography>
              )}
              <Typography variant="h5" fontWeight="bolder" minHeight={100}>
                {post.title}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {post.author && (
                  <>
                    <AuthorAvatar
                      author={post.author}
                      sx={{ maxWidth: "24px", height: "24px" }}
                    />
                    <Typography variant="subtitle1">
                      {getAuthorName(post.author)}
                    </Typography>
                  </>
                )}

                <Typography color="text.disabled">•</Typography>

                <Typography variant="subtitle1" color="text.disabled">
                  {post.updated_at &&
                    new Date(post.updated_at).toLocaleDateString()}
                </Typography>
              </Stack>
              {!isMobile && (
                <BlogBookmarkButton post={post} variant="compact" />
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default BlogPostCard;
