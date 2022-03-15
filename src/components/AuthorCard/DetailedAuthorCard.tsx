import { limitParagraphWordCount } from "#/utils/limitParagraphWordCount";
import AuthorAvatar from "@/components/AuthorAvatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Author } from "@tryghost/content-api";
import React from "react";

interface DetailedAuthorCardProps {
  author: Author;
}

const DetailedAuthorCard: React.FC<DetailedAuthorCardProps> = ({ author }) => {
  return (
    <Card
      sx={{
        padding: 3,
      }}
    >
      <Stack direction="row" spacing={5}>
        <CardMedia>
          <AuthorAvatar author={author} sx={{ height: 100, width: 100 }} />
        </CardMedia>
        <CardContent sx={{ marginTop: 3, padding: "0 !important" }}>
          <Typography variant="h5">{author.name}</Typography>
          <Typography variant="subtitle1">
            {limitParagraphWordCount(author.bio, 20)}
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default DetailedAuthorCard;
