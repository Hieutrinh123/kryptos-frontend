import { contentToExcerpt } from "#/utils/contentToExcerpt";
import AuthorAvatar from "@/containers/AuthorAvatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Author } from "@/api/author";
import NextLink from "next/link";
import React from "react";

interface DetailedAuthorCardProps {
  author: Author;
}

const DetailedAuthorCard: React.FC<DetailedAuthorCardProps> = ({ author }) => {
  return (
    <NextLink href={`/authors/${author.id}`} passHref>
      <a>
        <Card
          sx={{
            padding: 3,
          }}
        >
          <Stack direction={{ mobile: "column", tablet: "row" }} spacing={5}>
            <CardMedia>
              <Box display="flex" justifyContent="center" alignItems="center">
                <AuthorAvatar
                  author={author}
                  sx={{ height: 100, width: 100 }}
                />
              </Box>
            </CardMedia>
            <CardContent sx={{ marginTop: 3, padding: "0 !important" }}>
              <Typography variant="h5">{author.name}</Typography>
              <Typography variant="subtitle1">
                {contentToExcerpt(author.bio, 20)}
              </Typography>
            </CardContent>
          </Stack>
        </Card>
      </a>
    </NextLink>
  );
};

export default DetailedAuthorCard;
