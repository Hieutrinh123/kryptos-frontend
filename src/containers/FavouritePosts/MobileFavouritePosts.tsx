// import BasicPagination from "@/components/BasicPagination";
import { carouselTimeout, carouselTransitionTime } from "#/config/homepage";
import BlogCard from "@/components/BlogCard";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { Box, TextField, Typography, Card, CardContent } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const posts = [
  {
    id: "1",
    slug: "1",
    name: "Lorem Ipsum Dolor Sit Amet",
    primary_tag: {
      name: "Subcategory Name",
    },
    post: "Jan 27",
    primary_author: {
      name: "User",
    },
  },
  {
    id: "2",
    slug: "2",

    name: "Lorem Ipsum Dolor Sit Amet",
    primary_tag: {
      name: "Subcategory Name",
    },
    post: "Jan 27",
    primary_author: {
      name: "User",
    },
  },
  {
    id: "3",
    slug: "3",

    name: "Lorem Ipsum Dolor Sit Amet",
    primary_tag: {
      name: "Subcategory Name",
    },
    post: "Jan 27",
    primary_author: {
      name: "User",
    },
  },
  {
    id: "4",
    slug: "4",

    name: "Lorem Ipsum Dolor Sit Amet",
    primary_tag: {
      name: "Subcategory Name",
    },
    post: "Jan 27",
    primary_author: {
      name: "User",
    },
  },
  {
    id: "5",
    slug: "5",

    name: "Lorem Ipsum Dolor Sit Amet",
    primary_tag: {
      name: "Subcategory Name",
    },
    post: "Jan 27",
    primary_author: {
      name: "User",
    },
  },
  {
    id: "6",
    slug: "6",

    name: "Lorem Ipsum Dolor Sit Amet",
    primary_tag: {
      name: "Subcategory Name",
    },
    post: "Jan 27",
    primary_author: {
      name: "User",
    },
  },
];

interface MobileFavouritePostsProps {}

const MobileFavouritePosts: React.FC<MobileFavouritePostsProps> = ({}) => {
  const renderPosts = (posts: any) => {
    const postList: any[] = [];
    posts.map((post: any, idx: number) => {
      postList.push(
        <Box sx={{ marginRight: 2 }}>
          <BlogCard post={post} />
        </Box>
      );
    });

    return postList;
  };

  return (
    <Card sx={{ borderRadius: "24px", padding: 1, background: "transparent" }}>
      <CardContent>
        <Box
          sx={{
            marginBottom: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <ArrowDropUpOutlinedIcon
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <Typography variant='h5' fontWeight='bold' textAlign='center'>
              Bài viết đã thích
            </Typography>
          </Box>

          <TextField
            sx={(theme) => ({
              backgroundColor: theme.palette.grey["700"],
              border: 0,
              width: "100%",
              borderRadius: 50,
              marginTop: 3,
              marginBottom: 3,
              padding: 0,
            })}
          />
        </Box>
        <Slider
          autoplay
          autoplaySpeed={carouselTimeout}
          arrows={false}
          infinite
          centerMode
          centerPadding='10%'
          speed={carouselTransitionTime}
          slidesToShow={1}
          slidesToScroll={1}
          initialSlide={2}
        >
          {renderPosts(posts)}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default MobileFavouritePosts;

// {
//   /* <Slider
// dots
// autoplay
// autoplaySpeed={carouselTimeout}
// arrows={false}
// infinite
// centerMode
// centerPadding="10%"
// speed={carouselTransitionTime}
// slidesToShow={1}
// slidesToScroll={1}
// initialSlide={2}
// >
// {posts.map((post) => (
//   <Box key={post.id} paddingX={2}>
//     <BlogCard post={post} variant="short" />
//   </Box>
// ))}
// </Slider> */
// }
