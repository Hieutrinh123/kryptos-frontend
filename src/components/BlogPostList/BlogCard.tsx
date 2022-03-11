import AuthorAvatar from "@/components/AuthorAvatar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostOrPage } from "@tryghost/content-api";
import React from "react";

interface SquareBlogCardProps {
  post: PostOrPage;
}

const BlogCard: React.FC<SquareBlogCardProps> = ({ post }) => {
  return (
    <Card>
      <CardMedia component="img" src={post.feature_image ?? undefined} />
      <CardContent>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography component="div" variant="subtitle2">
              {post.primary_tag?.name}
            </Typography>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2}>
              {post.primary_author && (
                <>
                  <AuthorAvatar
                    author={post.primary_author}
                    sx={{ maxWidth: "24px", height: "24px" }}
                  />
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.primary_author.name ?? "Author"}
                  </Typography>
                </>
              )}

              <span>•</span>

              <Typography variant="subtitle1" color="text.secondary">
                {post.published_at &&
                  new Date(post.published_at).toLocaleDateString()}
              </Typography>
            </Stack>

            <CardActions className="left">
              <BookmarkBorderIcon />
            </CardActions>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
