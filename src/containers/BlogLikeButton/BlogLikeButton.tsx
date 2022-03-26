import { useLikePost } from "#/hooks/firestore/usePostInteraction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { PostOrPage } from "@tryghost/content-api";
import React from "react";

interface BlogLikeButton {
  post: PostOrPage;
  variant: "compact" | "full";
}

const BlogLikeButton: React.FC<BlogLikeButton> = ({
  post,
  variant = "compact",
}) => {
  if (variant === "compact") {
    return <CompactBlogLikeButton post={post} />;
  }
  return <FullBlogLikeButton post={post} />;
};

interface InnerBlogLikeButtonProps {
  post: PostOrPage;
}

const CompactBlogLikeButton: React.FC<InnerBlogLikeButtonProps> = ({
  post,
}) => {
  const { liked, toggleLike, loading } = useLikePost(post);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <IconButton
      color={liked ? "primary" : "secondary"}
      onClick={(event) => {
        event.stopPropagation();
        toggleLike();
      }}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

const FullBlogLikeButton: React.FC<InnerBlogLikeButtonProps> = ({ post }) => {
  const { liked, toggleLike, loading } = useLikePost(post);

  return (
    <Button
      color={liked ? "primary" : "secondary"}
      variant="contained"
      sx={{ paddingY: 1 }}
      onClick={(event) => {
        if (!loading) {
          event.stopPropagation();
          toggleLike();
        }
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        justifyContent={"flex-end"}
      >
        {loading ? <CircularProgress size={24} /> : <FavoriteIcon />}

        <span style={{ width: 120 }}>
          {liked ? "Bỏ thích" : "Thích bài viết"}
        </span>
      </Stack>
    </Button>
  );
};

export default BlogLikeButton;
