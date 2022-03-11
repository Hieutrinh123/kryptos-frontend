import { useIsMobile } from "#/styles/responsive";
import Box from "@mui/material/Box";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import ComputerAndTabletPostList from "./ComputerAndTabletPostList";
import MobilePostList from "./MobilePostList";

interface ListPostProps {
  posts: PostsOrPages;
}

const PostList: React.FC<ListPostProps> = ({ posts }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Box display={isMobile ? "block" : "none"}>
        <MobilePostList posts={posts} />
      </Box>
      <Box display={isMobile ? "none" : "block"}>
        <ComputerAndTabletPostList posts={posts} />
      </Box>
    </>
  );
};

export default PostList;
