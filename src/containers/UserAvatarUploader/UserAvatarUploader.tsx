import { firebaseAuth, firebaseStorage } from "#/config/firebase";
import { useFirebaseAuthState } from "#/hooks/useFirebaseAuthState";
import { useFirebaseUploadFile } from "#/hooks/useFirebaseUploadFile";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import UserAvatar from "@/containers/UserAvatar";
import UploadIcon from "@mui/icons-material/Upload";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { ref as calculateRef, StorageReference } from "firebase/storage";
import React, { useCallback, useRef } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

interface UserAvatarUploaderProps {}

const UserAvatarUploader: React.FC<UserAvatarUploaderProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [user] = useFirebaseAuthState();

  let fileReference: StorageReference | undefined;
  if (user) {
    fileReference = calculateRef(firebaseStorage, `${user.uid}/profilePicture`);
  }

  const { uploadToFirebase, downloadUrl, uploading, error } =
    useFirebaseUploadFile(fileReference);
  const [updateProfile, updatingProfile] = useUpdateProfile(firebaseAuth);

  useShowAlertEffect(error?.message, "error");

  const handleUploadImage = useCallback(
    async (file?: File) => {
      if (file && user) {
        const uploadResult = await uploadToFirebase(file);
        if (uploadResult) {
          await updateProfile({ photoURL: downloadUrl });
        }
      }
    },
    [user, uploadToFirebase, updateProfile, downloadUrl]
  );

  if (!user) {
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      <label htmlFor="avatar-uploader">
        <input
          ref={inputRef}
          accept="image/*"
          id="avatar-uploader"
          type="file"
          onChange={(event) =>
            handleUploadImage(event.target.files?.item(0) ?? undefined)
          }
          style={{ display: "none" }}
        />
        {uploading || updatingProfile ? (
          <CircularProgress />
        ) : (
          <UserAvatar
            user={user}
            sx={{ cursor: "pointer", height: "120px", width: "120px" }}
          />
        )}
      </label>

      <Box
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        borderRadius="50%"
        onClick={() => {
          inputRef.current?.click();
        }}
        sx={{
          background: "rgba(0, 0, 0, 0.5)",
          opacity: 0,
          transition: "500ms",
          cursor: "pointer",
          ":hover": {
            opacity: 1,
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          <UploadIcon />
        </div>
      </Box>
    </div>
  );
};

export default UserAvatarUploader;
