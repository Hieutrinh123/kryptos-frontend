import { useIsMobile } from "@/common/styles/responsive";
import CreatePost from "@/containers/CreatePost";
import FavouritePosts from "@/containers/FavouritePosts";
import PersonalReview from "@/containers/PersonalReview";
import ProfileTabs from "@/containers/ProfileTabs";
import FullLayout from "@/layouts/FullLayout";
import { Box, Container } from "@mui/material";
import { NextPage } from "next";
interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  const isMobile = useIsMobile();
  return (
    <FullLayout>
      <Container sx={{ marginTop: 7 }}>
        <PersonalReview />
        <Container
          sx={{
            display: isMobile ? "block" : "flex",
            marginTop: 4,
            padding: 0,
          }}
        >
          <Box
            className='left__container'
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              marginRight: isMobile ? 0 : 4,
            }}
          >
            <ProfileTabs />
          </Box>
          <Box className='right_container' sx={{ flex: 3, padding: 0 }}>
            {/* <FavouritePosts /> */}
            <CreatePost />
          </Box>
        </Container>
      </Container>
    </FullLayout>
  );
};

export default ProfilePage;
