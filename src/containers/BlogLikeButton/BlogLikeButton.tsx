import { Post } from "@/api";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { useLikePost } from "@/firebase/firestore/usePostInteraction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react";

interface BlogLikeButton {
  post: Post;
  variant: "compact" | "full";
}

const BlogLikeButton: React.FC<BlogLikeButton> = ({
  post,
  variant = "compact",
}) => {
  const { t } = useTranslation();
  const { user, loading: loadingUser } = useFirebaseAuthState();
  const { liked, toggleLike, loading } = useLikePost(post);
  const router = useRouter();

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (!loadingUser && !user) {
      return router.push("/auth");
    }
    toggleLike();
  };

  if (variant === "compact") {
    if (loading) {
      return <CircularProgress />;
    }

    return (
      <IconButton color={liked ? "primary" : "secondary"} onClick={handleClick}>
        <FavoriteIcon />
      </IconButton>
    );
  }

  return (
    <Button
      color={liked ? "primary" : "secondary"}
      variant="contained"
      sx={{ paddingY: 1 }}
      onClick={handleClick}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        justifyContent="flex-end"
      >
        {loading ? <CircularProgress size={24} /> : <FavoriteIcon />}

        <span style={{ width: 120 }}>
          {liked ? t("Unlike") : t("Like Post")}
        </span>
      </Stack>
    </Button>
  );
};

export default BlogLikeButton;
