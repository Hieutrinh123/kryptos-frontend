import { POSTS_PER_PAGE } from "#/config/posts";
import { useIsDesktop } from "#/styles/responsive";
import { usePosts } from "@/api/posts/postHooks";
import { usePostIdsWithInteraction } from "@/firebase/firestore/usePostInteraction";
import { Box, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import BlogPostCard from "../BlogCard";

interface UserInformationManagement {
  title: string;
  field: "liked" | "bookmarked";
}
const PersonalPostList: React.FC<UserInformationManagement> = ({
  field,
  title,
}) => {
  const [page, setPage] = useState(1);
  const { ids: postIds, loading } = usePostIdsWithInteraction(field);
  const posts = usePosts(postIds, page, POSTS_PER_PAGE);
  const isDesktop = useIsDesktop();
const { t } = useTranslation();

  if (loading) {
    return <CircularProgress />;
  }
  if (!posts?.data) {
    return null;
  }

  return (
    <Paper sx={{ padding: 6 }}>
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight="bolder" align="center">
          {title}
        </Typography>
        {posts.data.map((post) => (
          <BlogPostCard
            post={post}
            variant={isDesktop ? "horizontal" : "vertical"}
            hideBookmarkButton
            key={post.id}
          />
        ))}
        {posts.data.length > 0 && (
          <Box display="flex" justifyContent="center">
            <Pagination page={page} onChange={(event, page) => setPage(page)} />
          </Box>
        )}
        {posts.data.length === 0 && (
          <Typography variant="h4" fontWeight="bolder" align="center">
            {t("No Post")}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default PersonalPostList;
