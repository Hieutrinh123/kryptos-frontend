import FavouritePosts from "@/containers/FavouritePosts";
import PersonalReview from "@/containers/PersonalReview";
import FullLayout from "@/layouts/FullLayout";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Container, Typography } from "@mui/material";
import { NextPage } from "next";
interface ProfilePageProps { }

const ProfilePage: NextPage<ProfilePageProps> = ({ }) => {
  return (
    <FullLayout>
      <Container sx={{ marginTop: 7 }}>
        <PersonalReview />
        <Container sx={{ display: 'flex', marginTop: 4, padding: 0 }}>
          <Box className='left__container' sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: 4 }}>
            <Button
              sx={(theme) => ({
                maxWidth: 318,
                backgroundColor: theme.palette.grey['800'],
                borderRadius: 3,
                padding: 2,
                marginBottom: 3
              })}
            >
              <Typography variant="h5" fontWeight='bold' sx={(theme) => ({ color: theme.palette.grey['500'], display: "flex", alignItems: 'center' })}>
                Đăng bài
                <AddIcon sx={{ marginLeft: 4 }} />
              </Typography>
            </Button>
            <Button
              sx={(theme) => ({
                maxWidth: 318,
                backgroundColor: theme.palette.grey['800'],
                borderRadius: 3,
                padding: 2,
                marginBottom: 3
              })}
            >
              <Typography variant="h5" fontWeight='bold' sx={(theme) => ({ color: theme.palette.grey['500'], display: "flex", alignItems: 'center' })}>
                Duyệt bài
                <DoneIcon sx={{ marginLeft: 4 }} />
              </Typography>
            </Button>
            <Box sx={(theme) => ({
              borderRadius: 3,
              padding: 3,
              backgroundColor: theme.palette.grey['800']
            })}>
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
          </Box>
          <Box
            className='right_container'
            sx={{ flex: 3, padding: 0 }}
          >
            <FavouritePosts />
          </Box>
        </Container>
      </Container>
    </FullLayout >
  );
};

export default ProfilePage;

