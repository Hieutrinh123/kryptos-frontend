import { POSTS_PER_PAGE } from "#/config/posts";
import { useIsDesktop } from "#/styles/responsive";
import { PostListingResult } from "@/api";
import { useListPostsWithIds } from "@/api/posts/postHooks";
import { usePostIdsWithInteraction } from "@/firebase/firestore/usePostInteraction";
import { Box, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React, { Dispatch, SetStateAction, useState } from "react";
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
  const { ids: postIds, loading: loadingIds } =
    usePostIdsWithInteraction(field);
  const { posts, loading: loadingPosts } = useListPostsWithIds(
    postIds,
    page,
    POSTS_PER_PAGE
  );
  const { t } = useTranslation();

  return (
    <Paper sx={{ padding: 6 }}>
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight="bolder" align="center">
          {title}
        </Typography>
        {loadingIds || loadingPosts ? (
          <Box alignSelf="center">
            <CircularProgress />
          </Box>
        ) : !posts?.data || posts.data.length === 0 ? (
          <Typography fontWeight="bolder" align="center">
            {t("Nothing Yet")}
          </Typography>
        ) : (
          <PostListAndPagination posts={posts} page={page} setPage={setPage} />
        )}
      </Stack>
    </Paper>
  );
};
interface PostListAndPaginationProps {
  posts: PostListingResult;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const PostListAndPagination: React.FC<PostListAndPaginationProps> = ({
  posts,
  page,
  setPage,
}) => {
  const isDesktop = useIsDesktop();
  return (
    <>
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
    </>
  );
};

export default PersonalPostList;
