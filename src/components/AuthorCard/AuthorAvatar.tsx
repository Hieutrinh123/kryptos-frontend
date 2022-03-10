import { Author } from "@tryghost/content-api";
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
      src={author.profile_image ?? undefined}
      alt={author.name}
      sx={{ height: "100%", width: "100%" }}
    >
      {author.name ? getInitials(author.name) : "Author"}
    </Avatar>
  );
};

export default AuthorAvatar;
