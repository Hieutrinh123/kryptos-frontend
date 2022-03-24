import { useIsMobile } from "@/common/styles/responsive";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import ComputerFavouritePosts from "./ComputerFavouritePosts";
import MobileFavouritePosts from "./MobileFavouritePosts";

interface FavouritePostsProps {
  posts: PostsOrPages;
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
