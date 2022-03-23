// import BasicPagination from "@/components/BasicPagination";
import { useIsMobile } from "@/common/styles/responsive";
import React from "react";
import ComputerFavouritePosts from "./ComputerFavouritePosts";
import MobileFavouritePosts from "./MobileFavouritePosts";

interface FavouritePostsProps {}

const FavouritePosts: React.FC<FavouritePostsProps> = ({}) => {
  const isMobile = useIsMobile();

  return (
    <>{isMobile ? <MobileFavouritePosts /> : <ComputerFavouritePosts />}</>
  );
};

export default FavouritePosts;
