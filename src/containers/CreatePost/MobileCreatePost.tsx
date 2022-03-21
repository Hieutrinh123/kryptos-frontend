// import BasicPagination from "@/components/BasicPagination";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

interface MobileCreatePostProps {}

const MobileCreatePost: React.FC<MobileCreatePostProps> = ({}) => {
  return (
    <Card sx={{ borderRadius: "24px", padding: 1 }}>
      <CardContent sx={{}}>
        <Box sx={{ display: "flex", marginTop: 4 }}>
          <Typography variant='h5' fontWeight='bold'>
            Tạo bài viết
          </Typography>
        </Box>
        <FormControl
          sx={(theme) => ({
            height: 48,
            width: "100%",
            marginBottom: 4,
          })}
        >
          <InputLabel
            id='main-category'
            sx={(theme) => ({
              color: theme.palette.grey["400"],
            })}
          >
            Chọn đề mục chính (bắt buộc)
          </InputLabel>
          <Select
            id='main-category'
            label='Chọn đề mục chính (bắt buộc)'
            labelId='main-category'
            sx={(theme) => ({ backgroundColor: theme.palette.grey["700"] })}
          ></Select>
        </FormControl>

        <FormControl sx={{ height: 48, width: "100%" }}>
          <InputLabel
            id='sub-category'
            sx={(theme) => ({
              color: theme.palette.grey["400"],
            })}
          >
            Chọn đề mục phụ (bắt buộc)
          </InputLabel>
          <Select
            id='sub-category'
            label='Chọn đề mục phụ (bắt buộc)'
            labelId='sub-category'
            sx={(theme) => ({ backgroundColor: theme.palette.grey["700"] })}
          ></Select>
        </FormControl>
        <TextField
          fullWidth
          placeholder='Nhập tiêu đề bài viết'
          sx={(theme) => ({
            backgroundColor: theme.palette.grey["700"],
            marginTop: 4,
            marginBottom: 1,
            borderRadius: 20,
          })}
        />
        <Typography variant='subtitle2' textAlign='right' color='warning'>
          Bài viết bắt buộc phải có tiêu đề
        </Typography>
        <TextField
          id='outlined-multiline-static'
          label='Nhập nội dung bài viết'
          multiline
          rows={10}
          fullWidth
          sx={(theme) => ({
            marginTop: 1,
            backgroundColor: theme.palette.grey["700"],
            borderRadius: 13,
          })}
        />
        <Box sx={{ marginTop: 4.5 }}>
          <Box
            className='tool'
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant='body1' fontWeight='bold'>
              Tùy chọn chèn:
            </Typography>
            <Button
              sx={(theme) => ({
                width: 48,
                height: 48,
                minWidth: 48,
                backgroundColor: theme.palette.grey["700"],
                borderRadius: "50%",
              })}
            >
              <ImageOutlinedIcon />
            </Button>
            <Button
              sx={(theme) => ({
                width: 48,
                height: 48,
                minWidth: 48,
                backgroundColor: theme.palette.grey["700"],
                borderRadius: "50%",
              })}
            >
              <InsertDriveFileOutlinedIcon />
            </Button>
            <Button
              sx={(theme) => ({
                width: 48,
                height: 48,
                minWidth: 48,
                backgroundColor: theme.palette.grey["700"],
                borderRadius: "50%",
              })}
            >
              <InsertLinkOutlinedIcon />
            </Button>
          </Box>
          <Box
            className='confirm'
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={(theme) => ({
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.palette.grey["700"],
                width: 150,
                color: theme.palette.grey["50"],
              })}
            >
              Xem trước
            </Button>
            <Button
              sx={(theme) => ({
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.palette.grey["700"],
                width: 150,
                color: theme.palette.grey["50"],
              })}
            >
              Đăng bài
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MobileCreatePost;
