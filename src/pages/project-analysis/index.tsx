import { Author } from "@/api/author";
import AuthorList from "@/containers/AuthorList";
import ListBlogs from "@/containers/BlogList";
import FullLayout from "@/layouts/FullLayout";
import { Container, Typography } from "@mui/material";
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
  return {
    props: {
      authors: [
        {
          name: "An Tran",
        },
        {
          avatar: "https://via.placeholder.com/150",
          name: "Son Pham",
        },
        {
          avatar: "https://via.placeholder.com/150",
          name: "Hoa Tri",
        },
      ],
    },
  };
};
