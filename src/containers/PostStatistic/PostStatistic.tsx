import { Post } from "@/api";
import { useCommentSnapshotList } from "@/firebase/firestore/useCommentList";
import {
  usePostLikeCount,
  usePostViewCount,
} from "@/firebase/firestore/usePostInteraction";
import CommentCountIcon from "@mui/icons-material/ChatBubbleOutline";
import LikeIcon from "@mui/icons-material/FavoriteBorder";
import ViewCountIcon from "@mui/icons-material/Visibility";
import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface PostStatisticProps {
  post: Post;
}

const PostStatistic: React.FC<PostStatisticProps> = ({ post }) => {
  const { count: viewCount, loading: loadingViewCount } =
    usePostViewCount(post);
  const { commentSnapshots, loading: loadingCommentCount } =
    useCommentSnapshotList(post);
  const { count: likeCount, loading: loadingLikeCount } =
    usePostLikeCount(post);
  return (
    <Stack direction="row" spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <ViewCountIcon fontSize="small" />
        <Typography fontSize="smaller">
          {loadingViewCount ? <CircularProgress size={20} /> : viewCount}
        </Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <CommentCountIcon fontSize="small" />
        <Typography fontSize="smaller">
          {loadingCommentCount ? (
            <CircularProgress size={20} />
          ) : (
            commentSnapshots?.size ?? 0
          )}
        </Typography>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <LikeIcon fontSize="small" />
        <Typography fontSize="smaller">
          {loadingLikeCount ? <CircularProgress size={20} /> : likeCount}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PostStatistic;
