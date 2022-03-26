import { useAuthStateWithRedirect } from "#/hooks/useFirebaseAuthState";
import { useFirebaseUpdateProfile } from "#/hooks/useFirebaseUpdateProfile";
import {
  useCreateNewExtraDataIfNotExisting,
  useUpdateUserExtraData,
  useUserExtraData,
} from "#/hooks/useUserExtraData";
import Grid from "@/components/Grid";
import SwitchModeTextField from "@/components/SwitchModeTextField";
import UserAvatarUploader from "@/containers/UserAvatarUploader";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface UserInformationManagementProps {}

const UserInformationManagement: React.FC<
  UserInformationManagementProps
> = ({}) => {
  const { user, loading: loadingUser } = useAuthStateWithRedirect();

  const { data: userExtraData, loading: loadingUserExtraData } =
    useUserExtraData();

  useCreateNewExtraDataIfNotExisting();

  const { update: updateProfile, loading: loadingUpdateProfile } =
    useFirebaseUpdateProfile();

  const { update: updateUserExtraData, loading: loadingUpdateExtraData } =
    useUpdateUserExtraData();

  if (!user) {
    return null;
  }

  if (loadingUser) {
    return (
      <Paper
        elevation={1}
        sx={{
          padding: 3,
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
      }}
    >
      <Grid container spacing={4}>
        <Grid item mobile={12} tablet={3} desktop={2}>
          <Box maxWidth={120} maxHeight={120} flexBasis={120}>
            <UserAvatarUploader />
          </Box>
        </Grid>
        <Grid item mobile={12} tablet={9} desktop={4}>
          <Stack spacing={1}>
            <SwitchModeTextField
              defaultValue={user.displayName ?? ""}
              onSave={(name) => updateProfile({ displayName: name })}
              loading={loadingUpdateProfile}
              label="Tên người dùng"
            >
              <Typography variant="h5" fontWeight="bolder">
                {user.displayName}
              </Typography>
            </SwitchModeTextField>
            <p>
              <Typography fontWeight="bolder" component="span">
                Email:{" "}
              </Typography>

              <Typography component="span">{user.email}</Typography>
            </p>
            <SwitchModeTextField
              defaultValue={userExtraData?.phoneNumber ?? ""}
              onSave={(phoneNumber) => updateUserExtraData({ phoneNumber })}
              loading={loadingUpdateExtraData}
              label="Số điện thoại"
            >
              <p>
                <Typography fontWeight="bolder" component="span">
                  Số điện thoại:{" "}
                </Typography>

                <Typography component="span">
                  {userExtraData?.phoneNumber ?? "Chưa cập nhật"}
                </Typography>
              </p>
            </SwitchModeTextField>
          </Stack>
        </Grid>
        <Grid item mobile={12} tablet={12} desktop={6}>
          {!loadingUserExtraData && userExtraData ? (
            <SwitchModeTextField
              defaultValue={userExtraData.bio ?? ""}
              onSave={(bio) => updateUserExtraData({ bio })}
              loading={loadingUpdateExtraData}
              multiline
              maximumLength={300}
              minRows={5}
              label="Giới thiệu"
            >
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bolder">
                  Giới thiệu
                </Typography>
                <Typography variant="body1">{userExtraData.bio}</Typography>
              </Stack>
            </SwitchModeTextField>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserInformationManagement;
