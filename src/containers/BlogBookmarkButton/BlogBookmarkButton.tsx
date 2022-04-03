import { useBookmarkPost } from "@/api/hooks/firestore/usePostInteraction";
import { Post } from "@/api/posts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import React from "react";

interface BlogBookmarkButton {
  post: Post;
  variant: "compact" | "full";
}

const BlogBookmarkButton: React.FC<BlogBookmarkButton> = ({
  post,
  variant = "compact",
}) => {
  if (variant === "compact") {
    return <CompactBlogBookmarkButton post={post} />;
  }
  return <FullBlogBookmarkButton post={post} />;
};

interface InnerBlogBookmarkButtonProps {
  post: Post;
}

const CompactBlogBookmarkButton: React.FC<InnerBlogBookmarkButtonProps> = ({
  post,
}) => {
  const { bookmarked, toggleBookmark, loading } = useBookmarkPost(post);

  return (
    <IconButton
      color={bookmarked ? "primary" : "secondary"}
      onClick={(event) => {
        if (!loading) {
          event.stopPropagation();
          toggleBookmark();
        }
      }}
    >
      {loading ? <CircularProgress /> : <BookmarkBorderIcon />}
    </IconButton>
  );
};

const FullBlogBookmarkButton: React.FC<InnerBlogBookmarkButtonProps> = ({
  post,
}) => {
  const { bookmarked, toggleBookmark, loading } = useBookmarkPost(post);
  const { t } = useTranslation();
  return (
    <Button
      color={bookmarked ? "primary" : "secondary"}
      variant="contained"
      sx={{ paddingY: 1 }}
      onClick={(event) => {
        if (!loading) {
          event.stopPropagation();
          toggleBookmark();
        }
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        justifyContent={"flex-end"}
      >
        {loading ? <CircularProgress size={24} /> : <BookmarkBorderIcon />}

        <span style={{ width: 120 }}>
          {bookmarked ? t("Unsave") : t("Save Post")}
        </span>
      </Stack>
    </Button>
  );
};

export default BlogBookmarkButton;
