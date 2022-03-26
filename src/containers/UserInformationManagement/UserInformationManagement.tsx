import { firebaseAuth } from "#/config/firebase";
import { useAuthStateWithRedirect } from "#/hooks/useFirebaseAuthState";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import EditableTextField from "@/components/EditableTextField";
import Grid from "@/components/Grid";
import UserAvatarUploader from "@/containers/UserAvatarUploader";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

interface UserInformationManagementProps {}

const UserInformationManagement: React.FC<
  UserInformationManagementProps
> = ({}) => {
  const [user] = useAuthStateWithRedirect();
  const [updateProfile, updating, error] = useUpdateProfile(firebaseAuth);
  useShowAlertEffect(getFirebaseAuthErrorMessage(error), "error");

  if (!user) {
    return null;
  }
  return (
    <>
      <Paper
        elevation={1}
        sx={{
          padding: 3,
        }}
      >
        <Grid container spacing={4}>
          <Grid item mobile={12} tablet={4} desktop={2}>
            <Box maxWidth={120} maxHeight={120} flexBasis={120}>
              <UserAvatarUploader />
            </Box>
          </Grid>
          <Grid item mobile={12} tablet={8} desktop={10}>
            <EditableTextField
              defaultValue={user.displayName ?? ""}
              onSave={(name) => updateProfile({ displayName: name })}
              loading={updating}
              label="Tên người dùng"
            >
              <Typography variant="h5" fontWeight="bolder">
                {user.displayName}
              </Typography>
            </EditableTextField>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserInformationManagement;
