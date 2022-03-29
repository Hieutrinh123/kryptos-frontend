import { CommentData } from "@/api/hooks/firestore/useCommentList";
import { useCommentReplyList } from "@/api/hooks/firestore/useCommentReplyList";
import CommentInput from "@/containers/CommentListing/CommentInput";
import { DocumentReference } from "@firebase/firestore";
import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import SingleCommentDisplay from "./SingleCommentDisplay";

interface ReplyListingProps {
  commentReference: DocumentReference<CommentData>;
  showInput: boolean;
}

const ReplyListing: React.FC<ReplyListingProps> = ({
  commentReference,
  showInput,
}) => {
  const {
    replyCollection,
    replySnapshots,
    loading: loadingReplies,
  } = useCommentReplyList(commentReference);

  if (!replySnapshots) {
    return null;
  }
  if (loadingReplies) {
    return <CircularProgress />;
  }
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        {replySnapshots.docs.map((replySnapshot, index) => (
          <SingleCommentDisplay
            commentSnapshot={replySnapshot}
            isReply
            key={index}
          />
        ))}
      </Stack>
      {showInput && <CommentInput collectionRef={replyCollection} />}
    </Stack>
  );
};

export default ReplyListing;
