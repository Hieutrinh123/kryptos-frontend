import { Author } from "@/api/author";
import CompactAuthorCard from "@/components/AuthorCard";
import BasicPagination from "@/components/BasicPagination";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface AuthorListProps {
  authors: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
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
        {authors.map((author, index) => (
          <Grid item key={index}>
            <CompactAuthorCard author={author} />
          </Grid>
        ))}
      </Grid>
      <BasicPagination count={6} />
    </Box>
  );
};

export default AuthorList;
