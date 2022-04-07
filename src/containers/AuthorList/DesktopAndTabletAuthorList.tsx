import { Author } from "@/api";
import AuthorCard from "@/containers/AuthorCard";
import Grid from "@/components/Grid";
import { Box } from "@mui/material";
import React from "react";

interface DesktopAndTabletAuthorListProps {
  authors: Author[];
}

const DesktopAndTabletAuthorList: React.FC<DesktopAndTabletAuthorListProps> = ({
  authors,
}) => {
  return (
    <Box>
      <Grid
        container
        spacing={4}
        rowSpacing={4}
        justifyContent="center"
        alignItems="stretch"
      >
        {authors.map((author, index) => (
          <Grid item tablet={4} desktop={2} key={index}>
            <AuthorCard author={author} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DesktopAndTabletAuthorList;
