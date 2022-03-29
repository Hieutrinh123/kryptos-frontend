import { getInitials } from "#/utils/naming";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { Author } from "@tryghost/content-api";
import React from "react";

interface AuthorAvatarProps {
  author: Author;
  sx?: SxProps;
}

const StyledAvatar = styled(Avatar)({
  height: "100%",
  width: "100%",
});

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
