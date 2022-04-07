import { getAuthorName } from "@/api";
import AuthorAvatar from "@/containers/AuthorAvatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Author } from "@/api";
import NextLink from "next/link";
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
            flexDirection: "column",
            padding: 3,
            height: "100%",
          }}
        >
          <CardMedia>
            <AuthorAvatar author={author} sx={{ height: 80, width: 80 }} />
          </CardMedia>
          <CardContent sx={{ marginTop: 3, padding: "0 !important" }}>
            <Typography variant="h5" component="div" textAlign="center">
              {getAuthorName(author)}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </NextLink>
  );
};

export default CompactAuthorCard;
