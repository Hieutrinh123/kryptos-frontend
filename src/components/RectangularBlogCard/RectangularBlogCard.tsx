import CircleIcon from "@mui/icons-material/Circle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

interface RectangularBlogCardProps {}

const RectangularBlogCard: React.FC<RectangularBlogCardProps> = () => {
  return (
    <Card sx={{ borderRadius: 3, display: "flex", marginBottom: 2 }}>
      <CardMedia
        component='img'
        alt='green iguana'
        sx={{
          background: "#000000",
          borderRadius: 3,
          width: "249px!important",
        }}
      />
      <CardContent sx={{ padding: "16px 24px 24px 24px", flex: 1 }}>
        <Box sx={{}}>
          <Typography variant='body1'>Subcategory Name</Typography>
          <Typography
            variant='h5'
            fontWeight={900}
            marginTop={1}
            marginBottom={2}
          >
            Lorem Ipsum Dolor Sit Amet
          </Typography>

          <Box
            className='right'
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
            <Typography variant='body1'>User</Typography>
            <CircleIcon
              sx={{ fontSize: "4px", marginLeft: 2, marginRight: 2 }}
            />
            <Typography variant='body1'>Jan 27</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RectangularBlogCard;
