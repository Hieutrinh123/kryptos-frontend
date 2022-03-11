import { getHighlightPosts } from "@/api/posts";
import HighlightedPosts from "@/containers/HighlightedPosts";
import FullLayout from "@/layouts/FullLayout";
import { PostsOrPages } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";

interface HomePageProps {
  posts: PostsOrPages;
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <FullLayout>
      <HighlightedPosts posts={posts} />
    </FullLayout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const posts = await getHighlightPosts();
  return {
    props: {
      posts,
    },
  };
};
