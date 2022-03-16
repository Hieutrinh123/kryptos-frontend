import AuthorCard from "@/components/AuthorCard";
import Grid from "@/components/Grid";
import { Box } from "@mui/material";
import { Authors } from "@tryghost/content-api";
import React from "react";

interface DesktopAndTabletAuthorListProps {
  authors: Authors;
}

const DesktopAndTabletAuthorList: React.FC<DesktopAndTabletAuthorListProps> = ({
  authors,
}) => {
  return (
    <Box>
      <Grid container spacing={4} rowSpacing={4} justifyContent="center">
        {authors.map((author, index) => (
          <Grid item tablet={3} desktop={2} key={index}>
            <AuthorCard author={author} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DesktopAndTabletAuthorList;
