// import BasicPagination from "@/components/BasicPagination";
import RectangularBlogCard from "@/components/RectangularBlogCard";
import { Box, Pagination, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

interface ComputerFavouritePostsProps {}

const ComputerFavouritePosts: React.FC<ComputerFavouritePostsProps> = ({}) => {
  const renderPosts = () => {
    const postList = [];
    for (let i = 0; i < 6; i++) {
      postList.push(<RectangularBlogCard />);
    }
    return postList;
  };

  return (
    <Card sx={{ borderRadius: "24px", padding: 1 }}>
      <CardContent sx={{}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant='h5' fontWeight='bold'>
            Bài viết đã thích
          </Typography>
          <TextField
            sx={(theme) => ({
              backgroundColor: theme.palette.grey["700"],
              border: 0,
              width: 399,
              borderRadius: 50,
              // height: 48,
              padding: 0,
            })}
          />
        </Box>
        {renderPosts()}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <BasicPagination count={5} /> */}
          <Pagination count={5} />
          <Typography marginLeft={2} variant='body1' fontWeight={900}>
            Bài viết cũ hơn
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComputerFavouritePosts;
