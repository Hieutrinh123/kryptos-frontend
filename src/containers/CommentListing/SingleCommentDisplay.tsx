import { grey } from "#/styles/colors";
import { getLocalizedRelativeTime } from "#/utils/relativeTime";
import { IComment, Locale } from "@/api";
import Grid from "@/components/Grid";
import ReplyListing from "@/containers/CommentListing/ReplyListing";
import UserAvatar from "@/containers/UserAvatar";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { useCommenter } from "@/firebase/firestore/useCommenter";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { useBoolean } from "usehooks-ts";

interface SingleCommentDisplay {
  comment: IComment;
  isReply?: boolean;
}

const SingleCommentDisplay: React.FC<SingleCommentDisplay> = ({
  comment,
  isReply,
}) => {
  const { user } = useFirebaseAuthState();
  const { commenter } = useCommenter(comment);
  const router = useRouter();
  const { value: showReplyInput, toggle: toggleReplyInput } = useBoolean(false);
  const { t } = useTranslation();

  if (!commenter) {
    return null;
  }

  const showReplyButton = !isReply && user;

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item mobile={12} tablet={4}>
          <Stack direction="row" spacing={2}>
            <UserAvatar user={commenter} sx={{ width: 50, height: 50 }} />
            <Stack>
              <Typography>{commenter.displayName}</Typography>
              {comment.date_created && (
                <Typography color={grey["500"]} variant="caption">
                  {getLocalizedRelativeTime(
                    comment.date_created,
                    router.locale as Locale
                  )}
                </Typography>
              )}

              {!comment.approved && (
                <Typography>{t("Unapproved comment")}</Typography>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          mobile={showReplyButton ? 11 : 12}
          tablet={showReplyButton ? 7 : 8}
        >
          <Box
            padding={2}
            flexGrow={1}
            bgcolor="background.default"
            borderRadius="24px"
          >
            <Typography>{comment.content}</Typography>
          </Box>
        </Grid>
        {showReplyButton && (
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
              <ReplyListing commentId={comment.id} showInput={showReplyInput} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SingleCommentDisplay;
