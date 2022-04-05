import { carouselTimeout, carouselTransitionTime } from "#/config/carousel";
import BlogCard from "@/containers/BlogCard";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { Box, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PostListingResult } from "@/api";
import React from "react";
import Slider from "react-slick";

interface MobileFavouritePostsProps {
  posts: PostListingResult;
}

const MobileFavouritePosts: React.FC<MobileFavouritePostsProps> = ({
  posts,
}) => {
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
            <Typography variant="h5" fontWeight="bold" textAlign="center">
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
          centerPadding="10%"
          speed={carouselTransitionTime}
          slidesToShow={1}
          slidesToScroll={1}
          initialSlide={2}
        >
          {posts.data.map((post) => (
            <Box sx={{ marginRight: 2 }} key={post.slug}>
              <BlogCard post={post} />
            </Box>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default MobileFavouritePosts;
