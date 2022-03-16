import {
  ECOSYSTEM_CATEGORY,
  INDEPTH_ANALYSIS_CATEGORY,
  PROJECT_ANALYSIS_CATEGORY,
  UPDATE_CATEGORY,
} from "#/config/navigation";
import { listHighlightedPosts, listPostsByCategory } from "@/api/posts";
import AnalysisPostsSection from "@/containers/HomePageSections/AnalysisPostsSection";
import EcosystemPostsSection from "@/containers/HomePageSections/EcosystemPostsSection";
import HighlightedPostsSection from "@/containers/HomePageSections/HighlightedPostsSection";
import InDepthAnalysisPostsSection from "@/containers/HomePageSections/InDepthAnalysisPostsSection";
import UpdatePostsSection from "@/containers/HomePageSections/UpdatePostsSection";
import FullLayout from "@/layouts/FullLayout";
import Box from "@mui/material/Box";
import { PostsOrPages } from "@tryghost/content-api";
import { GetStaticProps, NextPage } from "next";

interface HomePageProps {
  posts: PostsOrPages;
  updatePosts: PostsOrPages;
  analysisPosts: PostsOrPages;
  ecosystemPosts: PostsOrPages;
  inDepthPosts: PostsOrPages;
}

const HomePage: NextPage<HomePageProps> = ({
  posts,
  updatePosts,
  analysisPosts,
  ecosystemPosts,
  inDepthPosts,
}) => {
  return (
    <FullLayout>
      <Box
        sx={(theme) => ({
          "& > *:nth-child(odd)": {
            backgroundColor: theme.palette.background.secondary,
          },
          "& > *:nth-child(even)": {
            backgroundColor: theme.palette.background.default,
          },
        })}
      >
        <HighlightedPostsSection posts={posts} />
        <UpdatePostsSection posts={updatePosts} />
        <AnalysisPostsSection posts={analysisPosts} />
        <EcosystemPostsSection posts={ecosystemPosts} />
        <InDepthAnalysisPostsSection posts={inDepthPosts} />
      </Box>
    </FullLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await listHighlightedPosts();
  const updatePosts = await listPostsByCategory(UPDATE_CATEGORY, 1, 5);
  const analysisPosts = await listPostsByCategory(
    PROJECT_ANALYSIS_CATEGORY,
    1,
    3
  );
  const ecosystemPosts = await listPostsByCategory(ECOSYSTEM_CATEGORY, 1, 6);
  const inDepthPosts = await listPostsByCategory(
    INDEPTH_ANALYSIS_CATEGORY,
    1,
    6
  );

  return {
    props: {
      posts,
      updatePosts,
      ecosystemPosts,
      analysisPosts,
      inDepthPosts,
    },
    revalidate: 60,
  };
};
