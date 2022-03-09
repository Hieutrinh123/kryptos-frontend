import ListAuthors from "@/containers/ListAuthors";
import ListBlogs from "@/containers/ListBlogs";
import FullLayout from "@/layouts/FullLayout";
import { Container, Typography } from "@mui/material";

const BlogListPage = () => {
  return (
    <FullLayout>
      <Container>
        <Typography
          component='div'
          variant='h3'
          fontWeight={900}
          textAlign='center'
          marginTop={6}
          marginBottom={5}
        >
          Phân tích dự án
        </Typography>
        <ListBlogs />
      </Container>
      <ListAuthors />
    </FullLayout>
  );
};

export default BlogListPage;
