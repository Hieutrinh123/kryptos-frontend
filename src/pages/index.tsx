import { COMMON_CACHE_TIME } from "#/config/caching";
import {
  ECOSYSTEM_CATEGORY,
  IN_DEPTH_ANALYSIS_CATEGORY,
  Navigation,
  NEWS_CATEGORY,
  PROJECT_ANALYSIS_CATEGORY,
} from "#/config/navigation";
import { getPageSettings, listPostsByCategories, Locale, Post } from "@/api";
import FeaturedPostsSection from "@/containers/HomePageSections/HighlightedPostsSection";
import ListPostsSection from "@/containers/HomePageSections/ListPostSection";
import NewsSection from "@/containers/HomePageSections/NewsSection";
import FullLayout from "@/layouts/FullLayout";
import Box from "@mui/material/Box";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface HomePageProps {
  featuredPosts: Post[];
  newsPosts: Post[];
  analysisPosts: Post[];
  ecosystemPosts: Post[];
  inDepthPosts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({
  featuredPosts,
  newsPosts,
  analysisPosts,
  ecosystemPosts,
  inDepthPosts,
}) => {
  const { t } = useTranslation();
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
        <NewsSection posts={newsPosts} />
        <ListPostsSection posts={analysisPosts} title={t("Project Analysis")} />
        <ListPostsSection posts={ecosystemPosts} title={t("Ecosystem")} />
        <ListPostsSection posts={inDepthPosts} title={t("In-depth Analysis")} />
      </Box>
    </FullLayout>
  );
};

export default HomePage;

function wrappedListPostsByCategory(
  category: Navigation,
  locale: Locale,
  page: number,
  limit: number
) {
  let categorySlugs = category.slug ? [category.slug] : [];
  if (category.subnavigations) {
    categorySlugs = categorySlugs.concat(
      category.subnavigations.map((subcategory) => subcategory.slug)
    );
  }
  return listPostsByCategories(categorySlugs, locale, page, limit);
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const locale = context.locale as Locale;

  const pageSettings = await getPageSettings(locale);

  const newsPosts = await wrappedListPostsByCategory(
    NEWS_CATEGORY,
    locale,
    1,
    5
  );
  const analysisPosts = await wrappedListPostsByCategory(
    PROJECT_ANALYSIS_CATEGORY,
    locale,
    1,
    6
  );
  const ecosystemPosts = await wrappedListPostsByCategory(
    ECOSYSTEM_CATEGORY,
    locale,
    1,
    6
  );
  const inDepthPosts = await wrappedListPostsByCategory(
    IN_DEPTH_ANALYSIS_CATEGORY,
    locale,
    1,
    6
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings,
      featuredPosts: pageSettings.featured_posts ?? [],
      newsPosts: newsPosts.data,
      ecosystemPosts: ecosystemPosts.data,
      analysisPosts: analysisPosts.data,
      inDepthPosts: inDepthPosts.data,
    },
    revalidate: COMMON_CACHE_TIME,
  };
};
