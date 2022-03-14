import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, Typography } from "@mui/material";
interface MobileProfileTabsProps {}

const MobileProfileTabs: React.FC<MobileProfileTabsProps> = () => {
  return (
    <>
      <Button
        sx={(theme) => ({
          backgroundColor: theme.palette.grey["800"],
          borderRadius: 3,
          padding: 2,
          marginBottom: 3,
        })}
      >
        <Typography
          variant='h5'
          fontWeight='bold'
          sx={(theme) => ({
            color: theme.palette.grey["500"],
            display: "flex",
            alignItems: "center",
          })}
        >
          Đăng bài
          <AddIcon sx={{ marginLeft: 4 }} />
        </Typography>
      </Button>
      <Button
        sx={(theme) => ({
          backgroundColor: theme.palette.grey["800"],
          borderRadius: 3,
          padding: 2,
          marginBottom: 3,
        })}
      >
        <Typography
          variant='h5'
          fontWeight='bold'
          sx={(theme) => ({
            color: theme.palette.grey["500"],
            display: "flex",
            alignItems: "center",
          })}
        >
          Duyệt bài
          <DoneIcon sx={{ marginLeft: 4 }} />
        </Typography>
      </Button>
      <Box
        sx={(theme) => ({
          borderRadius: 3,
          padding: 3,
          backgroundColor: theme.palette.grey["800"],
        })}
      >
        <Typography
          paddingTop={1.5}
          paddingBottom={1.5}
          paddingLeft={1.5}
          variant='h6'
          fontWeight='bold'
        >
          Bài viết đã thích
        </Typography>
        <Typography
          paddingTop={1.5}
          paddingBottom={1.5}
          paddingLeft={1.5}
          variant='h6'
          fontWeight='bold'
        >
          Bài viết đã lưu
        </Typography>
        <Typography
          paddingTop={1.5}
          paddingBottom={1.5}
          paddingLeft={1.5}
          variant='h6'
          fontWeight='bold'
        >
          Tác giả đang theo dõi
        </Typography>
      </Box>
    </>
  );
};

export default MobileProfileTabs;
