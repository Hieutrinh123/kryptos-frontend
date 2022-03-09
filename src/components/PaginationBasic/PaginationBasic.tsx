import { Pagination } from "@mui/material";
import React from "react";

interface PaginationBasicProps {
  count: number;
}

const PaginationBasic: React.FC<PaginationBasicProps> = ({ count }) => {
  return (
    <Pagination
      className="pagination-basic__container"
      count={count}
      sx={{ justifyContent: "center", display: "flex" }}
    />
  );
};

export default PaginationBasic;
