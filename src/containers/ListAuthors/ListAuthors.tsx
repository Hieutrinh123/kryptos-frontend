import CardAuthorCompact from "@/components/CardAuthorCompact";
import PaginationBasic from "@/components/PaginationBasic";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface ListAuthorsProps {}

const ListAuthors: React.FC<ListAuthorsProps> = ({}) => {
  const renderAuthorList = () => {
    let result = [];
    for (let i = 0; i < 6; i++) {
      result.push(
        <Grid item>
          <CardAuthorCompact authorName="Lorem" authorAvatar="bitcoin" />
        </Grid>
      );
    }
    return result;
  };

  return (
    <Box className="author__list">
      <Typography
        component="div"
        variant="h3"
        fontWeight={900}
        textAlign="center"
        marginTop={6}
        marginBottom={5}
      >
        Các tác giả
      </Typography>
      <Grid container spacing={4} rowSpacing={4} justifyContent="center">
        {renderAuthorList()}
      </Grid>
      <PaginationBasic count={6} />
    </Box>
  );
};

export default ListAuthors;
