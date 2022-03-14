import { useIsTablet } from "@/common/styles/responsive";
import CreateIcon from "@mui/icons-material/Create";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleIcon from "@mui/icons-material/People";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import React from "react";

interface ComputerPersonalReviewProps {}

const ComputerPersonalReview: React.FC<ComputerPersonalReviewProps> = () => {
  const isTablet = useIsTablet();
  return (
    <>
      <Box
        className='personal-review__container'
        sx={(theme) => ({
          backgroundColor: theme.palette.grey["700"],
          borderRadius: 3,
          padding: 3.5,
        })}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            className='left__container'
            sx={{ display: "flex", marginRight: 5 }}
          >
            <Avatar sx={{ width: 144, height: 144, marginRight: 3 }} />
            <Box>
              <Typography
                fontWeight='bold'
                variant='h5'
                sx={{ display: "flex" }}
              >
                Sonpt
                <CreateIcon
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    marginLeft: 2,
                  })}
                  fontSize='small'
                />
              </Typography>

              <Box
                sx={{ display: isTablet ? "block" : "flex", marginTop: 1.8 }}
              >
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    display: "flex",
                    marginRight: 2,
                    marginBottom: 1,
                  })}
                  variant='body2'
                >
                  <PeopleIcon sx={{ marginRight: 1 }} fontSize='small' />
                  0000
                </Typography>
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    display: "flex",
                    marginRight: 2,
                    marginBottom: 1,
                  })}
                  variant='body2'
                >
                  <DynamicFeedIcon sx={{ marginRight: 1 }} fontSize='small' />
                  0000
                </Typography>
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    display: "flex",
                    marginRight: 2,
                    marginBottom: 1,
                  })}
                  variant='body2'
                >
                  <FavoriteBorderIcon
                    sx={{ marginRight: 1 }}
                    fontSize='small'
                  />
                  0000
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className='right__container' sx={{ maxWidth: 617 }}>
            <Typography
              sx={{
                display: "flex",
                marginRight: 2,
                marginBottom: 1,
              }}
              variant='h6'
              fontWeight='bold'
            >
              Giới thiệu
              <CreateIcon
                sx={(theme) => ({
                  color: theme.palette.grey["500"],
                  marginLeft: 2,
                })}
                fontSize='small'
              />
            </Typography>
            <Typography variant='body1' textAlign='justify'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 7,
          }}
        >
          <Box className='left__container'>
            <Box
              className='email'
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant='body1' fontWeight='bold' marginRight={2}>
                Email:
              </Typography>
              <Typography
                variant='body1'
                justifyContent='space-between'
                display='flex'
              >
                sonpt@youngit.org
                <CreateIcon
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    marginLeft: 3,
                  })}
                  fontSize='small'
                />
              </Typography>
            </Box>
            <Box
              className='password'
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant='body1' fontWeight='bold' marginRight={2}>
                Password:
              </Typography>
              <Typography
                variant='body1'
                justifyContent='space-between'
                display='flex'
              >
                sonpt@youngit.org
                <CreateIcon
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    marginLeft: 3,
                  })}
                  fontSize='small'
                />
              </Typography>
            </Box>
            <Box
              className='phone'
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant='body1' fontWeight='bold' marginRight={2}>
                Số điện thoại:
              </Typography>
              <Typography
                variant='body1'
                justifyContent='space-between'
                display='flex'
              >
                sonpt@youngit.org
                <CreateIcon
                  sx={(theme) => ({
                    color: theme.palette.grey["500"],
                    marginLeft: 3,
                  })}
                  fontSize='small'
                />
              </Typography>
            </Box>
          </Box>
          <Box className='right__container' textAlign='right'>
            <Typography variant='body1'>
              Bạn đã thay đổi một vài thông tin
            </Typography>
            <ButtonBase
              sx={(theme) => ({
                minHeight: 48,
                borderRadius: 1.5,
                border: `2px solid ${theme.palette.primary.main}`,
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 1,
                paddingBottom: 1,
                marginTop: 2,
              })}
            >
              <Typography variant='body1'>Lưu thông tin</Typography>
            </ButtonBase>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ComputerPersonalReview;
