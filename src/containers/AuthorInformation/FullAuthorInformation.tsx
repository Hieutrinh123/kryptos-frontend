import { useIsMobile } from "#/styles/responsive";
import { Author } from "@/api/authors";
import Grid from "@/components/Grid";
import AuthorAvatar from "@/containers/AuthorAvatar";
import AuthorStatistic from "@/containers/AuthorInformation/AuthorStatistic";
import AuthorSubscribeButton from "@/containers/AuthorSubscribeButton";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface FullAuthorInformationProps {
  author: Author;
}

const FullAuthorInformation: React.FC<FullAuthorInformationProps> = ({
  author,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const avatarSize = isMobile ? 80 : 140;

  return (
    <Grid container spacing={4}>
      <Grid item mobile={12} desktop={5}>
        <Stack direction="row" spacing={5}>
          <Box width={avatarSize} flexBasis={avatarSize}>
            <AuthorAvatar
              author={author}
              sx={{ height: avatarSize, width: avatarSize }}
            />
          </Box>
          <Stack flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t("Author")}
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              {author.name}
            </Typography>

            {!isMobile && (
              <>
                <Box marginY={2}>
                  <AuthorStatistic author={author} />
                </Box>
                <AuthorSubscribeButton sx={{ maxWidth: 150 }} />
              </>
            )}
          </Stack>
        </Stack>
      </Grid>

      {isMobile && (
        <Grid item mobile={12}>
          <Box marginY={2}>
            <AuthorStatistic author={author} />
          </Box>
          <AuthorSubscribeButton />
        </Grid>
      )}

      <Grid item mobile={12} desktop={7}>
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("Biography")}
          </Typography>
          <Typography component="sub" variant="subtitle1">
            {author.bio ?? ""}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FullAuthorInformation;
