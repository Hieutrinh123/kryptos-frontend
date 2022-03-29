import Grid from "@/components/Grid";
import AuthorAvatar from "@/containers/AuthorAvatar";
import AuthorStatistic from "@/containers/AuthorInformation/AuthorStatistic";
import AuthorSubscribeButton from "@/containers/AuthorSubscribeButton";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Author } from "@tryghost/content-api";
import NextLink from "next/link";
import React from "react";

interface CompactAuthorInformationProps {
  author: Author;
}

const CompactAuthorInformation: React.FC<CompactAuthorInformationProps> = ({
  author,
}) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      <Grid item mobile={12} tablet={8} desktop={6}>
        <Stack direction="row" spacing={3}>
          <Box maxWidth={96} maxHeight={96} flexBasis={96}>
            <AuthorAvatar author={author} sx={{ height: 96, width: 96 }} />
          </Box>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              Tác giả
            </Typography>
            <Typography variant="h5" fontWeight="bolder" marginBottom={2}>
              {author.name ?? "Author"}
            </Typography>

            <AuthorStatistic author={author} />
          </Box>
        </Stack>
      </Grid>

      <Grid
        item
        mobile={12}
        tablet={4}
        desktop={6}
        alignItems="center"
        display="flex"
      >
        <Grid container spacing={2}>
          <Grid item mobile={12} desktop={6}>
            <AuthorSubscribeButton fullWidth />
          </Grid>

          <Grid item mobile={12} desktop={6}>
            <NextLink href={`/authors/${author.slug}`} passHref>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                sx={{ height: "48px", borderRadius: "12px" }}
              >
                Xem thêm
              </Button>
            </NextLink>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompactAuthorInformation;
