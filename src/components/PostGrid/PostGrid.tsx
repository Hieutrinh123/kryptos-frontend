import { textColorGradient } from "@/common/styles/gradients";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import NextImage from "next/image";
import React from "react";
interface PostGridProps {
  postImage: StaticImageData | string;
  title: String;
  category: String;
  avatarSrc: StaticImageData | String;
  userName: String;
}

const PostGrid: React.FC<PostGridProps> = ({
  postImage,
  title,
  category,
  avatarSrc,
  userName,
}) => {
  return (
    <Paper
      elevation={1}
      sx={(theme) => ({
        width: "100%",
        height: "360px",
        overflow: "hidden",
        "&:hover": {
          boxShadow: theme.shadows[5],
        },
      })}
    >
      <Stack justifyContent="stretch" spacing={2}>
        <Box
          sx={{
            width: "100%",
            height: "200px",
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "24px",
            backgroundColor: "#000",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NextImage
            src={postImage}
            alt="image"
            layout="fill"
            width="100%"
            height="100%"
          />
        </Box>
        <Stack
          sx={(theme) => ({
            px: theme.spacing(3),
            pb: theme.spacing(3),
            cursor: "pointer",
          })}
        >
          <Box
            height="100px"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            <Typography component="sub" sx={{ color: textColorGradient }}>
              {category}
            </Typography>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "1.4",
              }}
            >
              {title}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              divider={
                <FiberManualRecordIcon
                  color="secondary"
                  sx={{
                    width: "5px",
                    height: "5px",
                  }}
                />
              }
              alignItems="center"
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  alt={`Avatar ${userName}`}
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <Typography sx={{ fontWeight: "400" }}>{userName}</Typography>
              </Stack>
              <Typography color="secondary">Jan 27</Typography>
            </Stack>
            <BookmarkBorderIcon />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PostGrid;
