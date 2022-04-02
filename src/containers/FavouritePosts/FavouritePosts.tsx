import { useIsMobile } from "@/common/styles/responsive";
import { PostListingResult } from "@/api/posts";
import React from "react";
import ComputerFavouritePosts from "./ComputerFavouritePosts";
import MobileFavouritePosts from "./MobileFavouritePosts";

interface FavouritePostsProps {
  posts: PostListingResult;
}

const FavouritePosts: React.FC<FavouritePostsProps> = ({ posts }) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileFavouritePosts posts={posts} />
      ) : (
        <ComputerFavouritePosts />
      )}
    </>
  );
};

export default FavouritePosts;
