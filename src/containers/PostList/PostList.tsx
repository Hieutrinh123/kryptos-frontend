import { useIsMobile } from "#/styles/responsive";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import ComputerPostList from "./ComputerPostList";
import MobilePostList from "./MobilePostList";

interface ListPostProps {
  posts: PostsOrPages;
}

const PostList: React.FC<ListPostProps> = ({ posts }) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobilePostList posts={posts} />
      ) : (
        <ComputerPostList posts={posts} />
      )}
    </>
  );
};

export default PostList;
