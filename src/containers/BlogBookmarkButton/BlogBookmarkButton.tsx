import { Post } from "@/api";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { useBookmarkPost } from "@/firebase/firestore/usePostInteraction";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react";

interface BlogBookmarkButton {
  post: Post;
  variant: "compact" | "full";
}

const BlogBookmarkButton: React.FC<BlogBookmarkButton> = ({
  post,
  variant = "compact",
}) => {
  const { user } = useFirebaseAuthState();
  const { bookmarked, toggleBookmark, loading } = useBookmarkPost(post);
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (!user) {
      router.push("/auth");
      return;
    }
    if (!loading) {
      toggleBookmark();
    }
  };

  if (variant === "compact") {
    return (
      <IconButton
        color={bookmarked ? "primary" : "secondary"}
        onClick={handleClick}
      >
        {loading ? <CircularProgress size={24} /> : <BookmarkBorderIcon />}
      </IconButton>
    );
  }

  return (
    <Button
      color={bookmarked ? "primary" : "secondary"}
      variant="contained"
      sx={{ paddingY: 1 }}
      onClick={handleClick}
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
