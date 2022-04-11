import { useCommentReplies } from "@/api";
import CommentInput from "@/containers/CommentListing/CommentInput";
import { Button, CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import React from "react";
import SingleCommentDisplay from "./SingleCommentDisplay";

interface ReplyListingProps {
  commentId: number;
  showInput: boolean;
}

const ReplyListing: React.FC<ReplyListingProps> = ({
  commentId,
  showInput,
}) => {
  const {
    fetching,
    adding,
    data: replies,
    handleAdd,
    handleFetchNew,
    hasNextPage,
  } = useCommentReplies(commentId);

  const { t } = useTranslation();

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        {adding && <CircularProgress />}
        {replies.map((reply, index) => (
          <SingleCommentDisplay comment={reply} isReply key={index} />
        ))}
        {fetching && <CircularProgress />}
        {hasNextPage && !fetching && (
          <Button onClick={handleFetchNew}>{t("Load replies")}</Button>
        )}
      </Stack>
      {showInput && <CommentInput handleAdd={handleAdd} adding={adding} />}
    </Stack>
  );
};

export default ReplyListing;
