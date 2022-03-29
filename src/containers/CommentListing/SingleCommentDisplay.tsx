import { grey } from "#/styles/colors";
import { useCommenter } from "@/api/hooks/firestore/useCommenter";
import { CommentData } from "@/api/hooks/firestore/useCommentList";
import Grid from "@/components/Grid";
import ReplyListing from "@/containers/CommentListing/ReplyListing";
import UserAvatar from "@/containers/UserAvatar";
import { QueryDocumentSnapshot } from "@firebase/firestore";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useBoolean } from "usehooks-ts";

interface SingleCommentDisplay {
  commentSnapshot: QueryDocumentSnapshot<CommentData>;
  isReply?: boolean;
}

const SingleCommentDisplay: React.FC<SingleCommentDisplay> = ({
  commentSnapshot,
  isReply,
}) => {
  const comment = commentSnapshot.data();
  const { commenter } = useCommenter(comment);
  const { value: showReplyInput, toggle: toggleReplyInput } = useBoolean(false);
  if (!commenter) {
    return null;
  }
  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item mobile={12} tablet={4}>
          <Stack direction="row" spacing={2}>
            <UserAvatar user={commenter} sx={{ width: 50, height: 50 }} />
            <Stack>
              <Typography>{commenter.displayName}</Typography>
              {comment.timestamp && (
                <Typography color={grey["500"]} variant="caption">
                  {comment.timestamp.toDate().toLocaleString()}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item mobile={isReply ? 12 : 11} tablet={isReply ? 8 : 7}>
          <Box
            padding={2}
            flexGrow={1}
            bgcolor="background.default"
            borderRadius="24px"
          >
            <Typography>{comment.content}</Typography>
          </Box>
        </Grid>
        {!isReply && (
          <Grid item mobile={1}>
            <IconButton color="secondary" onClick={toggleReplyInput}>
              <ReplyIcon />
            </IconButton>
          </Grid>
        )}
        {!isReply && (
          <>
            <Grid item mobile={1} />
            <Grid item mobile={11}>
              <ReplyListing
                commentReference={commentSnapshot.ref}
                showInput={showReplyInput}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SingleCommentDisplay;
