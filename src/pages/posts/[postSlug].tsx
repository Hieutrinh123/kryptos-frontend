import { useIsDesktop } from "#/styles/responsive";
import { getPostDetail, listAllPostSlugs } from "@/api/posts";
import PostBanner from "@/containers/PostBanner";
import PostContent from "@/containers/PostContent";
import PostTableOfContent from "@/containers/PostTableOfContent";
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

interface BlogViewPageProps {
  post: PostOrPage;
}

const BlogViewPage: NextPage<BlogViewPageProps> = ({ post }) => {
  const isDesktop = useIsDesktop();
  if (!post) {
    return null;
  }
  return (
    <FullLayout>
      <PostBanner post={post} />
      <Container
        disableGutters={!isDesktop}
        maxWidth={false}
        sx={(theme) => ({
          [theme.breakpoints.only("mobile")]: {
            padding: 4,
          },
          padding: 6,
        })}
      >
        <Stack
          direction={{ mobile: "column", desktop: "row" }}
          spacing={4}
          marginY={4}
        >
          <Stack flex={1} spacing={4}>
            <Card sx={{ padding: 6 }}>
              <Typography variant="h6" mb={4}>
                Mục lục bài viết
              </Typography>
              <PostTableOfContent post={post} />
            </Card>
            <Card sx={{ padding: 6 }}>
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
          <Box flex={2}>
            <Card sx={{ padding: 6 }}>
              <PostContent postHTML={post.html} />
            </Card>
          </Box>
          <Box flex={1}>
            <Card sx={{ padding: 6 }}>Share</Card>
          </Box>
        </Stack>
      </Container>
    </FullLayout>
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
