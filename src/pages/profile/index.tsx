import UserInformationManagement from "@/containers/UserInformationManagement";
import FullLayout from "@/layouts/FullLayout";
import { Container } from "@mui/material";
import { NextPage } from "next";

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  return (
    <FullLayout>
      <Container sx={{ paddingY: 5 }}>
        <UserInformationManagement />
      </Container>
    </FullLayout>
  );
};

export default ProfilePage;
