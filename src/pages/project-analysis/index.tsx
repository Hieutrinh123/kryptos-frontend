import { listAuthors } from "@/api/author";
import AuthorList from "@/containers/AuthorList";
import ListBlogs from "@/containers/BlogList";
import FullLayout from "@/layouts/FullLayout";
import { Container, Typography } from "@mui/material";
import { Author } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";

interface BlogListPageProps {
  authors: Author[];
}

const BlogListPage: NextPage<BlogListPageProps> = ({ authors }) => {
  return (
    <FullLayout>
      <Container>
        <Typography
          component="div"
          variant="h3"
          fontWeight={900}
          textAlign="center"
          marginTop={6}
          marginBottom={5}
        >
          Phân tích dự án
        </Typography>
        <ListBlogs />
      </Container>
      <AuthorList authors={authors} />
    </FullLayout>
  );
};

export default BlogListPage;

export const getServerSideProps: GetServerSideProps<
  BlogListPageProps
> = async () => {
  const authors = await listAuthors(1);
  return {
    props: { authors },
  };
};
