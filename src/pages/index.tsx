import {
  ECOSYSTEM_CATEGORY,
  IN_DEPTH_ANALYSIS_CATEGORY,
  NEWS_CATEGORY,
  PROJECT_ANALYSIS_CATEGORY,
  UPDATE_CATEGORY,
} from "#/config/category";
import { getPageSettings } from "@/api/pageSettings";
import { listPostsByCategory, Post } from "@/api/posts";
import { Locale } from "@/api/strapi";
import AnalysisPostsSection from "@/containers/HomePageSections/AnalysisPostsSection";
import EcosystemPostsSection from "@/containers/HomePageSections/EcosystemPostsSection";
import FeaturedPostsSection from "@/containers/HomePageSections/HighlightedPostsSection";
import InDepthAnalysisPostsSection from "@/containers/HomePageSections/InDepthAnalysisPostsSection";
import UpdatePostsSection from "@/containers/HomePageSections/UpdatePostsSection";
import FullLayout from "@/layouts/FullLayout";
import Box from "@mui/material/Box";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface HomePageProps {
  featuredPosts: Post[];
  newsPosts: Post[];
  updatePosts: Post[];
  analysisPosts: Post[];
  ecosystemPosts: Post[];
  inDepthPosts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({
  featuredPosts,
  newsPosts,
  updatePosts,
  analysisPosts,
  ecosystemPosts,
  inDepthPosts,
}) => {
  return (
    <FullLayout>
      <Box
        sx={(theme) => ({
          "& > *:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.secondary,
          },
          "& > *:nth-of-type(even)": {
            backgroundColor: theme.palette.background.default,
          },
        })}
      >
        <FeaturedPostsSection posts={featuredPosts} />
        <UpdatePostsSection title="News" posts={newsPosts} />
        <UpdatePostsSection posts={updatePosts} />
        <AnalysisPostsSection posts={analysisPosts} />
        <EcosystemPostsSection posts={ecosystemPosts} />
        <InDepthAnalysisPostsSection posts={inDepthPosts} />
      </Box>
    </FullLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const pageSettings = await getPageSettings(context.locale as Locale);

  const newsPosts = await listPostsByCategory(NEWS_CATEGORY, 1, 5);
  const updatePosts = await listPostsByCategory(UPDATE_CATEGORY, 1, 5);
  const analysisPosts = await listPostsByCategory(
    PROJECT_ANALYSIS_CATEGORY,
    1,
    3
  );
  const ecosystemPosts = await listPostsByCategory(ECOSYSTEM_CATEGORY, 1, 6);
  const inDepthPosts = await listPostsByCategory(
    IN_DEPTH_ANALYSIS_CATEGORY,
    1,
    6
  );
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings,
      featuredPosts: pageSettings.featured_posts ?? [],
      newsPosts: newsPosts.results,
      updatePosts: updatePosts.results,
      ecosystemPosts: ecosystemPosts.results,
      analysisPosts: analysisPosts.results,
      inDepthPosts: inDepthPosts.results,
    },
    revalidate: 3600,
  };
};
