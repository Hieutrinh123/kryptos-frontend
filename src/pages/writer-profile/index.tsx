import AuthorInformation from "@/containers/AuthorInformation";
import ListPost from "@/containers/ListPost";
import { Box, Typography } from "@mui/material";
import React from "react";

const WriteProfilePage = () => {
  return (
    <Box>
      <AuthorInformation />
      <Box marginTop={{ md: 8, xs: 4 }}>
        <Typography
          variant="h3"
          component="h3"
          align="center"
          sx={(theme) => ({
            fontWeight: "700",
            [theme.breakpoints.down("md")]: {
              fontSize: "28px",
            },
          })}
        >
          Bài viết của Lorem Ipsum
        </Typography>
        <ListPost />
      </Box>
    </Box>
  );
};

export default WriteProfilePage;
