import { Post, useComments } from "@/api";
import { Button, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import React from "react";
import CommentInput from "./CommentInput";
import SingleCommentDisplay from "./SingleCommentDisplay";

interface CommentListingProps {
  post: Post;
}

const CommentListing: React.FC<CommentListingProps> = ({ post }) => {
  const {
    fetching,
    adding,
    data: comments,
    hasNextPage,
    handleFetchNew,
    handleAdd,
  } = useComments(post.id);
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      <Stack spacing={3}>
        {adding && <CircularProgress />}
        {comments.map((comment, index) => (
          <SingleCommentDisplay comment={comment} key={index} />
        ))}
        {hasNextPage && !fetching && (
          <Button onClick={handleFetchNew}>{t("Load more comments")}</Button>
        )}
      </Stack>
      <Divider />
      <CommentInput adding={adding} handleAdd={handleAdd} />
    </Stack>
  );
};

export default CommentListing;
