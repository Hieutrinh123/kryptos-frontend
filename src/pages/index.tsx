import { UPDATE_CATEGORY } from "#/config/navigation";
import { getHighlightPosts, getPostsByCategory } from "@/api/posts";
import PostList from "@/components/BlogPostList";
import HighlightedPosts from "@/containers/HighlightedPosts";
import FullLayout from "@/layouts/FullLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PostsOrPages } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";

interface HomePageProps {
  posts: PostsOrPages;
  updatePosts: PostsOrPages;
}

const HomePage: NextPage<HomePageProps> = ({ posts, updatePosts }) => {
  return (
    <FullLayout>
      <HighlightedPosts posts={posts} />
      <Box padding={(theme) => theme.spacing(3, 2)}>
        <Typography variant="h4" mb={3} fontWeight="bolder">
          Những cập nhật mới nhất
        </Typography>
        <PostList posts={updatePosts} />
      </Box>
    </FullLayout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const posts = await getHighlightPosts();
  const updatePosts = await getPostsByCategory(UPDATE_CATEGORY);

  return {
    props: {
      posts,
      updatePosts,
    },
  };
};
