import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Avatar, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

interface SquareBlogCardProps {
  title: string;
  subcategoryName: string;
  usernameCreate: string;
  userAvatarCreate: string;
  dateCreate: string;
  bookmark: boolean;
}

const SquareBlogCard: React.FC<SquareBlogCardProps> = ({
  title,
  subcategoryName,
  usernameCreate,
  dateCreate,
}) => {
  return (
    <Card sx={{ width: 352, borderRadius: "24px" }}>
      <CardMedia
        component="img"
        height="198"
        alt="green iguana"
        sx={{ background: "#000000", borderRadius: "24px" }}
      />
      <CardContent sx={{ padding: "16px 24px 24px 24px" }}>
        <Typography component="div" variant="subtitle1">
          {subcategoryName}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          marginTop={"18px"}
        >
          <Box
            className="right"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                marginRight: "12px",
              }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {usernameCreate}
            </Typography>
            <FiberManualRecordIcon
              sx={{
                margin: "0 20px",
                fontSize: 4,
              }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {dateCreate}
            </Typography>
          </Box>

          <CardActions className="left">
            <BookmarkBorderIcon />
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SquareBlogCard;
