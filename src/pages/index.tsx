import {
  ECOSYSTEM_CATEGORY,
  INDEPTH_ANALYSIS_CATEGORY,
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
  updatePosts: Post[];
  analysisPosts: Post[];
  ecosystemPosts: Post[];
  inDepthPosts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({
  featuredPosts,
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
  console.log(pageSettings);
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings,
      featuredPosts: pageSettings.featured_posts ?? [],
      updatePosts: updatePosts.results,
      ecosystemPosts: ecosystemPosts.results,
      analysisPosts: analysisPosts.results,
      inDepthPosts: inDepthPosts.results,
    },
    revalidate: 3600,
  };
};
