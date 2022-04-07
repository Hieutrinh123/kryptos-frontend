import { glassGradient } from "#/styles/gradients";
import { Post } from "@/api";
import AuthorChip from "@/containers/AuthorChip";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const PostTitle: React.FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} alignItems="flex-start">
      {post.categories.length > 0 && (
        <Chip
          label={
            <Typography variant="body1" fontWeight="bold" color="white">
              {t(post.categories[0].name)}
            </Typography>
          }
          sx={(theme) => ({
            padding: theme.spacing(2, 4),
            background: glassGradient,
          })}
        />
      )}

      <Typography variant="h1" fontSize={48} fontWeight="bolder">
        {post.title}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography variant="subtitle1">{t("Post published by")}</Typography>
        <AuthorChip author={post.author} />
      </Stack>
    </Stack>
  );
};

export default PostTitle;
