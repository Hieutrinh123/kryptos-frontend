import { Author } from "@/api/types";
import LikeIcon from "@mui/icons-material/FavoriteBorder";
import PostCountIcon from "@mui/icons-material/FilterNone";
import FollowCountIcon from "@mui/icons-material/PeopleOutline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface AuthorStatisticProps {
  author: Author;
}

const AuthorStatistic: React.FC<AuthorStatisticProps> = ({ author }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <FollowCountIcon fontSize="small" />
        <Typography fontSize="smaller">0000</Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <PostCountIcon fontSize="small" />
        <Typography fontSize="smaller">0</Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <LikeIcon fontSize="small" />
        <Typography fontSize="smaller">0000</Typography>
      </Stack>
    </Stack>
  );
};

export default AuthorStatistic;
