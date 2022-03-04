import PostGrid from "@/components/PostGrid";
import { Grid } from "@mui/material";
import React from "react";
import Img from "public/logo.png";

interface ListPostProps {}

const ListPost: React.FC<ListPostProps> = ({}) => {
  const listPosts = [
    {
      id: "post#1",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#2",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#3",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#4",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#5",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#6",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#7",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#8",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
    {
      id: "post#9",
      postImage: Img,
      title: "Lorem Ipsum Dolor Sit Amet",
      category: "Subcategory name",
      avatarSrc: Img,
      userName: "User",
    },
  ];
  return (
    <Grid
      container
      spacing={{ md: 4, xs: 2 }}
      marginTop={{ xs: 5 }}
      wrap="nowrap"
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          overflowX: "visible",
        },
      })}
    >
      {listPosts.map((post) => (
        <Grid
          item
          md={4}
          xs={12}
          key={post.id}
          sx={{
            flexShrink: "0",
          }}
        >
          <PostGrid
            avatarSrc={post.avatarSrc}
            category={post.category}
            postImage={post.postImage}
            title={post.title}
            userName={post.userName}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListPost;
