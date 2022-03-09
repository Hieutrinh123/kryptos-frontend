import { Author } from "@/api/author";
import Avatar from "@mui/material/Avatar";
import React from "react";

interface AuthorAvatarProps {
  author: Author;
}

function getInitials(name: string) {
  if (name.length === 0) {
    return "";
  }
  const tokens = name.split(" ");
  if (tokens.length === 1) {
    return tokens[0][0];
  }
  return tokens[0][0] + tokens[tokens.length - 1][0];
}

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ author }) => {
  return (
    <Avatar
      src={author.avatar}
      alt={author.name}
      sx={{
        height: 96,
        width: 96,
      }}
    >
      {getInitials(author.name)}
    </Avatar>
  );
};

export default AuthorAvatar;
