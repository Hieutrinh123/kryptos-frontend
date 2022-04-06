import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import {
  CommentData,
  useAddComment,
} from "@/firebase/firestore/useCommentList";
import LimitedInput from "@/components/LimitedInput";
import UserAvatar from "@/containers/UserAvatar";
import { CollectionReference } from "@firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import NextLink from "next/link";

interface CommentInputProps {
  collectionRef: CollectionReference<CommentData>;
}

const CommentInput: React.FC<CommentInputProps> = ({ collectionRef }) => {
  const { user } = useFirebaseAuthState();
  const { addComment, loading: addingComment } = useAddComment(collectionRef);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleAddComment = () => {
    if (addingComment) {
      return;
    }
    if (!value) {
      setError("Không được để trống nội dung bình luận");
      return;
    }
    return addComment(value);
  };

  if (!user) {
    return (
      <NextLink href="/auth" passHref>
        <Button variant="contained" color="primary" sx={{ padding: 2 }}>
          <span>{t("Sign In to Comment")}</span>
        </Button>
      </NextLink>
    );
  }

  return (
    <Stack spacing={2} direction="row">
      <Typography fontWeight="bolder">{t("Write Comment")}</Typography>
      <UserAvatar user={user} sx={{ width: 50, height: 50 }} />
      <LimitedInput
        value={value}
        variant="filled"
        onChange={(event) => {
          setValue(event.target.value);
          setError("");
        }}
        error={!!error}
        helperText={error}
        multiline
        fullWidth
        maximumLength={500}
        label={t("Comment's Detail")}
        maxRows={5}
      />
      <IconButton
        color="primary"
        sx={{ height: 50, width: 50 }}
        onClick={handleAddComment}
      >
        {addingComment ? <CircularProgress /> : <SendIcon />}
      </IconButton>
    </Stack>
  );
};

export default CommentInput;
