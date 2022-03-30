import { api } from "@/api/api";
import LikeIcon from "@mui/icons-material/FavoriteBorder";
import PostCountIcon from "@mui/icons-material/FilterNone";
import FollowCountIcon from "@mui/icons-material/PeopleOutline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Author } from "@tryghost/content-api";
import React, { useEffect, useState } from "react";

interface AuthorStatisticProps {
  author: Author;
}

const AuthorStatistic: React.FC<AuthorStatisticProps> = ({ author }) => {
  const [postCount, setPostCount] = useState(0);
  useEffect(() => {
    api.authors
      .read({ id: author.id }, { include: ["count.posts"] })
      .then((authorDetail) => {
        if (authorDetail.count?.posts) {
          setPostCount(authorDetail.count.posts);
        }
      });
  });
  return (
    <Stack direction="row" spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <FollowCountIcon fontSize="small" />
        <Typography fontSize="smaller">0000</Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <PostCountIcon fontSize="small" />
        <Typography fontSize="smaller">{postCount}</Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <LikeIcon fontSize="small" />
        <Typography fontSize="smaller">0000</Typography>
      </Stack>
    </Stack>
  );
};

export default AuthorStatistic;
