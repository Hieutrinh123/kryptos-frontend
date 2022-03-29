import { useFirebaseAuthState } from "@/api/hooks/auth/useFirebaseAuthState";
import {
  CommentData,
  useAddComment,
} from "@/api/hooks/firestore/useCommentList";
import LimitedInput from "@/components/LimitedInput";
import UserAvatar from "@/containers/UserAvatar";
import { CollectionReference } from "@firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

interface CommentInputProps {
  collectionRef: CollectionReference<CommentData>;
}

const CommentInput: React.FC<CommentInputProps> = ({ collectionRef }) => {
  const { user } = useFirebaseAuthState();
  const { addComment, loading: addingComment } = useAddComment(collectionRef);
  const [value, setValue] = useState("");
  return (
    <Stack spacing={2} direction="row">
      <Typography fontWeight="bolder">Viết bình luận</Typography>
      {user && <UserAvatar user={user} sx={{ width: 50, height: 50 }} />}
      <LimitedInput
        value={value}
        variant="filled"
        onChange={(event) => setValue(event.target.value)}
        multiline
        fullWidth
        maximumLength={500}
        label="Nội dung bình luận"
        maxRows={5}
      />
      <IconButton
        color="primary"
        sx={{ height: 50, width: 50 }}
        onClick={addingComment ? undefined : () => addComment(value)}
      >
        {addingComment ? <CircularProgress /> : <SendIcon />}
      </IconButton>
    </Stack>
  );
};

export default CommentInput;
