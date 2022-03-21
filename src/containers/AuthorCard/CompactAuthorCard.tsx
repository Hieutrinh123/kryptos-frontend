import AuthorAvatar from "@/containers/AuthorAvatar";
import NextLink from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Author } from "@tryghost/content-api";
import React from "react";

interface CompactAuthorCardProps {
  author: Author;
}

const CompactAuthorCard: React.FC<CompactAuthorCardProps> = ({ author }) => {
  return (
    <NextLink href={`/authors/${author.slug}`} passHref>
      <a>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column ",
            padding: 3,
          }}
        >
          <CardMedia>
            <AuthorAvatar author={author} />
          </CardMedia>
          <CardContent sx={{ marginTop: 3, padding: "0 !important" }}>
            <Typography variant="h5" component="div">
              {author.name}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </NextLink>
  );
};

export default CompactAuthorCard;
