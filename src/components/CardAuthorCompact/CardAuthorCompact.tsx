import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

interface CardAuthorProps {
  authorAvatar: string;
  authorName: string;
}

const CardAuthorCompact: React.FC<CardAuthorProps> = ({ authorName }) => {
  return (
    <Card
      sx={{
        maxWidth: "196px",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column ",
        padding: "24px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          background: "#000000",
          borderRadius: "50%",
          width: "96px",
          height: "96px",
        }}
      />
      <CardContent sx={{ marginTop: "20px", padding: "0 !important" }}>
        <Typography variant="h5" component="div">
          {authorName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardAuthorCompact;
