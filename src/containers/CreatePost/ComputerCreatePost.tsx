// import BasicPagination from "@/components/BasicPagination";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
interface ComputerCreatePostProps {}

const ComputerCreatePost: React.FC<ComputerCreatePostProps> = ({}) => {
  return (
    <Card sx={{ borderRadius: "24px", padding: 1 }}>
      <CardContent sx={{}}>
        <Typography variant='h5' fontWeight='bold'>
          Tạo bài viết
        </Typography>
        <Box sx={{ display: "flex", marginTop: 4 }}>
          <FormControl
            sx={(theme) => ({
              flex: 1,
              marginRight: 2,
              height: 48,
            })}
          >
            <InputLabel id='main-category'>
              Chọn đề mục chính (bắt buộc)
            </InputLabel>
            <Select
              id='main-category'
              label='Chọn đề mục chính (bắt buộc)'
              labelId='main-category'
              sx={(theme) => ({ backgroundColor: theme.palette.grey["700"] })}
            ></Select>
          </FormControl>

          <FormControl sx={{ flex: 1, marginRight: 2, height: 48 }}>
            <InputLabel id='sub-category'>
              Chọn đề mục phụ (bắt buộc)
            </InputLabel>
            <Select
              id='sub-category'
              label='Chọn đề mục phụ (bắt buộc)'
              labelId='sub-category'
              sx={(theme) => ({ backgroundColor: theme.palette.grey["700"] })}
            ></Select>
          </FormControl>
        </Box>

        <TextField
          fullWidth
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
        <Box sx={{ display: "flex", marginTop: 4.5 }}>
          <Box
            className='tool'
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
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
          {/* <Box
            className='confirm'
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComputerCreatePost;
