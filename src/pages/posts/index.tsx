import { useIsMobile } from "#/styles/responsive";
import { listAuthors } from "@/api/author";
import { listPosts } from "@/api/posts";
import BlogPostList from "@/components/BlogPostList";
import AuthorList from "@/containers/AuthorList";
import FullLayout from "@/layouts/FullLayout";
import { Container, Typography } from "@mui/material";
import { Authors, PostsOrPages } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";

interface BlogListPageProps {
  authors: Authors;
  posts: PostsOrPages;
}

const BlogListPage: NextPage<BlogListPageProps> = ({ authors, posts }) => {
  const isMobile = useIsMobile();
  return (
    <FullLayout>
      <Container>
        <Typography
          variant="h3"
          fontWeight={900}
          textAlign="center"
          marginTop={6}
          marginBottom={5}
        >
          Các bài viết
        </Typography>

        <BlogPostList posts={posts} mobileCarousel={false} />
        {!isMobile && (
          <>
            <Typography
              variant="h3"
              fontWeight={900}
              textAlign="center"
              marginTop={6}
              marginBottom={5}
            >
              Các tác giả
            </Typography>
            <AuthorList authors={authors} />
          </>
        )}
      </Container>
    </FullLayout>
  );
};

export default BlogListPage;

export const getServerSideProps: GetServerSideProps<
  BlogListPageProps
> = async () => {
  const authors = await listAuthors(1);
  const posts = await listPosts(1, 9);
  return {
    props: { authors, posts },
  };
};
