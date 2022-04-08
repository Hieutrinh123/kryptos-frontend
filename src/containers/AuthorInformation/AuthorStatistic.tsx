import { Author } from "@/api";
import { useCountFollow } from "@/firebase/firestore/useAuthorFollow";
import PostCountIcon from "@mui/icons-material/FilterNone";
import FollowCountIcon from "@mui/icons-material/PeopleOutline";
import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface AuthorStatisticProps {
  author: Author;
}

const AuthorStatistic: React.FC<AuthorStatisticProps> = ({ author }) => {
  const { count, loading } = useCountFollow(author);
  return (
    <Stack direction="row" spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <FollowCountIcon fontSize="small" />
        <Typography fontSize="smaller">
          {loading ? <CircularProgress size={20} /> : count}
        </Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <PostCountIcon fontSize="small" />
        <Typography fontSize="smaller">{author.postCount}</Typography>
      </Stack>
    </Stack>
  );
};

export default AuthorStatistic;
