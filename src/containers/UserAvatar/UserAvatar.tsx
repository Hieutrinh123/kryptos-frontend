import { getInitials } from "#/utils/naming";
import { UserData } from "@/firebase/firestore/useUserData";
import { User } from "@firebase/auth";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import NextImage from "next/image";
import React from "react";

interface UserAvatarProps {
  user: User | UserData;
  sx?: AvatarProps["sx"];
}

const StyledAvatar = styled(Avatar)({
  height: "100%",
  width: "100%",
});

const UserAvatar: React.FC<UserAvatarProps> = ({ user, sx }) => {
  return (
    <StyledAvatar
      src={user.photoURL ?? undefined}
      alt={`${user.displayName}'s avatar`}
      sx={sx}
    >
      {user.photoURL ? (
        <NextImage
          src={user.photoURL}
          alt={`${user.displayName}'s avatar`}
          layout="fill"
        />
      ) : (
        getInitials(user.displayName)
      )}
    </StyledAvatar>
  );
};

export default UserAvatar;
