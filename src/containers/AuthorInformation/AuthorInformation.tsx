import { useIsMobile } from "#/styles/responsive";
import AuthorAvatar from "@/components/AuthorAvatar";
import Grid from "@/components/Grid";
import { Button, Paper, Stack, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import { Author } from "@tryghost/content-api";
import React from "react";

interface AuthorInformationProps {
  author: Author;
}

const SubscribeButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      sx={{
        height: "48px",
        borderRadius: "12px",
        width: "100%",
      }}
    >
      <span>Đã theo dõi</span>
    </Button>
  );
};

const AuthorInformation: React.FC<AuthorInformationProps> = ({ author }) => {
  const isMobile = useIsMobile();

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          mobile={4}
          tablet={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box maxWidth={140} maxHeight={140}>
            <AuthorAvatar author={author} />
          </Box>
        </Grid>

        <Grid item mobile={8} tablet={4}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Tác giả</Typography>
            <Typography variant="h5">{author.name ?? "Author"}</Typography>
            {!isMobile && <SubscribeButton />}
          </Stack>
        </Grid>

        {isMobile && (
          <Grid item mobile={12}>
            <SubscribeButton />
          </Grid>
        )}

        <Grid item mobile={12} tablet={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Giới thiệu</Typography>
            <Typography component="sub" variant="subtitle1">
              {author.bio ?? ""}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuthorInformation;
