import { firebaseStorage } from "#/config/firebase";
import { useFirebaseAuthState } from "#/hooks/useFirebaseAuthState";
import { useFirebaseUpdateProfile } from "#/hooks/useFirebaseUpdateProfile";
import { useFirebaseUploadFile } from "#/hooks/useFirebaseUploadFile";
import UserAvatar from "@/containers/UserAvatar";
import UploadIcon from "@mui/icons-material/Upload";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { ref as calculateRef, StorageReference } from "firebase/storage";
import React, { useCallback, useRef } from "react";

interface UserAvatarUploaderProps {}

const UserAvatarUploader: React.FC<UserAvatarUploaderProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useFirebaseAuthState();

  let fileReference: StorageReference | undefined;
  if (user) {
    fileReference = calculateRef(firebaseStorage, `${user.uid}/profilePicture`);
  }

  const { uploadToFirebase, downloadUrl, uploading } =
    useFirebaseUploadFile(fileReference);
  const { update: updateProfile, loading: loadingUpdateProfile } =
    useFirebaseUpdateProfile();

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
        {uploading || loadingUpdateProfile ? (
          <CircularProgress />
        ) : (
          <UserAvatar user={user} />
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
