import PostGrid from "@/components/PostGrid";
import { Grid } from "@mui/material";
import React from "react";
import { PostItem } from "./data";

interface ComputerListPostProps {
  listPosts: PostItem[];
}

const ComputerListPost: React.FC<ComputerListPostProps> = ({ listPosts }) => {
  return (
    <Grid
      container
      spacing={{ sm: 4, xs: 2 }}
      marginTop={{ xs: 5 }}
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          overflowX: "visible",
          flexWrap: "nowrap",
        },
      })}
    >
      {listPosts.map((post) => (
        <Grid
          item
          md={4}
          sm={6}
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

export default ComputerListPost;
