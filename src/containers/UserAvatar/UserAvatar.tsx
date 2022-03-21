import { getInitials } from "#/utils/username";
import { User } from "@firebase/auth";
import Avatar from "@mui/material/Avatar";
import React from "react";

interface UserAvatarProps {
  user: User;
  height?: number;
  width?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, height, width }) => {
  return (
    <Avatar
      src={user.photoURL ?? undefined}
      alt={`${user.displayName}'s avatar`}
      sx={{
        height,
        width,
      }}
    >
      {getInitials(user.displayName)}
    </Avatar>
  );
};

export default UserAvatar;
