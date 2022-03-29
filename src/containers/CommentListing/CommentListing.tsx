import { useCommentSnapshotList } from "@/api/hooks/firestore/useCommentList";
import Divider from "@mui/material/Divider";
import CommentInput from "./CommentInput";
import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import { PostOrPage } from "@tryghost/content-api";
import React from "react";
import SingleCommentDisplay from "./SingleCommentDisplay";

interface CommentListingProps {
  post: PostOrPage;
}

const CommentListing: React.FC<CommentListingProps> = ({ post }) => {
  const {
    commentSnapshots,
    loading: loadingComments,
    commentCollectionRef,
  } = useCommentSnapshotList(post);
  if (!commentSnapshots) {
    return null;
  }
  if (loadingComments) {
    return <CircularProgress />;
  }
  return (
    <Stack spacing={4}>
      <Stack spacing={3}>
        {commentSnapshots.docs.map((commentSnapshot, index) => (
          <SingleCommentDisplay commentSnapshot={commentSnapshot} key={index} />
        ))}
      </Stack>
      <Divider />
      <CommentInput collectionRef={commentCollectionRef} />
    </Stack>
  );
};

export default CommentListing;
