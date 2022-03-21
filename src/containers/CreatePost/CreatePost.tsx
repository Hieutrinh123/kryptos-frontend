// import BasicPagination from "@/components/BasicPagination";
import { useIsMobile } from "@/common/styles/responsive";
import React from "react";
import MobileCreatePost from "./MobileCreatePost";
import ComputerCreatePost from "./ComputerCreatePost";

interface MobileFavouritePostsProps {}

const MobileFavouritePosts: React.FC<MobileFavouritePostsProps> = ({}) => {
  const isMobile = useIsMobile();
  return <> {isMobile ? <MobileCreatePost /> : <ComputerCreatePost />}</>;
};

export default MobileFavouritePosts;
