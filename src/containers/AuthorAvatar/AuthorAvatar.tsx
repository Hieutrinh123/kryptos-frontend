import { getInitials } from "#/utils/naming";
import { Author, getAuthorName, resolveImageUrl } from "@/api";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import React from "react";

interface AuthorAvatarProps {
  author: Author;
  sx?: SxProps;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "100%",
  boxShadow: theme.shadows[1],
  width: "100%",
}));

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ author, sx }) => {
  const avatarUrl = resolveImageUrl(author.avatar);
  return (
    <StyledAvatar src={avatarUrl} alt={getAuthorName(author)} sx={sx}>
      {getInitials(getAuthorName(author))}
    </StyledAvatar>
  );
};

export default AuthorAvatar;
