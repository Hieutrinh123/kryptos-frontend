import { useIsDesktop, useIsMobile } from "#/styles/responsive";
import { getPostDetail, listAllPostSlugs } from "@/api/posts";
import BlogBookmarkButton from "@/containers/BlogBookmarkButton";
import BlogLikeButton from "@/containers/BlogLikeButton";
import PostBanner from "@/containers/PostBanner";
import PostContent from "@/containers/PostContent";
import PostTableOfContent from "@/containers/PostTableOfContent";
import SocialLinks from "@/containers/SocialLinks";
import FullLayout from "@/layouts/FullLayout";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PostOrPage } from "@tryghost/content-api";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

interface BlogViewPageProps {
  post: PostOrPage;
}

const BlogViewPage: NextPage<BlogViewPageProps> = ({ post }) => {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  if (!post) {
    return null;
  }
  return (
    <FullLayout>
      <PostBanner post={post} />
      <Container
        disableGutters={!isDesktop}
        sx={{ paddingTop: 4, paddingBottom: 6 }}
      >
        <Stack direction={{ mobile: "column", desktop: "row" }} spacing={4}>
          <Box flex={3}>
            <Stack spacing={3}>
              <Card sx={{ padding: 6 }}>
                <PostContent postHTML={post.html} />
              </Card>
              <Card sx={{ padding: 4 }}>
                <Stack direction="row" spacing={2}>
                  <BlogBookmarkButton
                    post={post}
                    variant={isMobile ? "compact" : "full"}
                  />
                  <BlogLikeButton
                    post={post}
                    variant={isMobile ? "compact" : "full"}
                  />
                </Stack>
              </Card>
            </Stack>
          </Box>

          <Box flex={1}>
            <PostSideBar post={post} />
          </Box>
        </Stack>
      </Container>
    </FullLayout>
  );
};

interface PostSideBarProps {
  post: PostOrPage;
}

const PostSideBar: React.FC<PostSideBarProps> = ({ post }) => {
  return (
    <Stack spacing={4} position="sticky" top={100}>
      <Card sx={{ padding: 4 }}>
        <Typography variant="h6" mb={4}>
          Share
        </Typography>
        <SocialLinks />
      </Card>

      <Card sx={{ padding: 4 }}>
        <Typography variant="h6" mb={4}>
          Mục lục bài viết
        </Typography>
        <PostTableOfContent post={post} />
      </Card>

      <Card sx={{ padding: 4 }}>
        <Typography variant="h6" mb={4}>
          Tags
        </Typography>
        <Stack direction="row" flexWrap="wrap">
          {post?.tags?.map((tag) => (
            <Box paddingRight={2} paddingBottom={2} key={tag.id}>
              <Chip label={tag.name} />
            </Box>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
};

export default BlogViewPage;

export const getStaticProps: GetStaticProps<BlogViewPageProps> = async (
  context
) => {
  const postSlug = context.params?.postSlug;
  if (!postSlug) {
    return {
      notFound: true,
    };
  }
  const post = await getPostDetail(postSlug as string);
  if (_.isNil(post)) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
    revalidate: 900,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await listAllPostSlugs();
  return {
    paths: postSlugs.map((postSlug) => ({ params: { postSlug } })),
    fallback: true,
  };
};
