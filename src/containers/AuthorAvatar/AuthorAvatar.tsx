import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { Author } from "@tryghost/content-api";
import Avatar from "@mui/material/Avatar";
import React from "react";

interface AuthorAvatarProps {
  author: Author;
  sx?: SxProps;
}

const StyledAvatar = styled(Avatar)({
  height: "100%",
  width: "100%",
});

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

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ author, sx }) => {
  return (
    <StyledAvatar
      src={author.profile_image ?? undefined}
      alt={author.name}
      sx={sx}
    >
      {author.name ? getInitials(author.name) : "Author"}
    </StyledAvatar>
  );
};

export default AuthorAvatar;
