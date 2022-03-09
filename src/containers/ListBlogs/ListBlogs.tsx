import CardBlogSquare from "@/components/CardBlogSquare";
import PaginationBlogList from "@/components/PaginationBlogList";
import { Grid } from "@mui/material";
import React from "react";

interface ListBlogsProps {}

const ListBlogs: React.FC<ListBlogsProps> = ({}) => {
  const renderBlogList = () => {
    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push(
        <Grid item xs={4}>
          <CardBlogSquare
            title="Lorem"
            subcategoryName="bitcoin"
            usernameCreate="sonpt"
            userAvatarCreate="abc"
            dateCreate="1/1/2021"
            bookmark={true}
          />
        </Grid>
      );
    }
    return result;
  };

  return (
    <>
      <Grid container spacing={4} rowSpacing={4} justifyContent="center">
        {renderBlogList()}
      </Grid>
      <PaginationBlogList count={100} />
    </>
  );
};

export default ListBlogs;
