import { useMediaQuery, Theme } from "@mui/material";
import React from "react";
import ComputerListPost from "./ComputerListPost";
import { listPosts } from "./data";
import MobileListPost from "./MobileListPost";

interface ListPostProps {}

const ListPost: React.FC<ListPostProps> = ({}) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <>
      {isMobile ? (
        <MobileListPost listPosts={listPosts} />
      ) : (
        <ComputerListPost listPosts={listPosts} />
      )}
    </>
  );
};

export default ListPost;
