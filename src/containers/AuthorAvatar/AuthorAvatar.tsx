import { getInitials } from "#/utils/naming";
import { Author, getAuthorName, resolveImageUrl } from "@/api";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import NextImage from "next/image";
import React from "react";

interface AuthorAvatarProps {
  author: Author;
  sx?: SxProps;
  badge?: boolean;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "100%",
  boxShadow: theme.shadows[1],
  width: "100%",
}));

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ author, sx, badge }) => {
  const avatarUrl = resolveImageUrl(author.avatar);
  const result = (
    <StyledAvatar alt={getAuthorName(author)} sx={sx}>
      {avatarUrl ? (
        <NextImage src={avatarUrl} alt={getAuthorName(author)} layout="fill" />
      ) : (
        getInitials(getAuthorName(author))
      )}
    </StyledAvatar>
  );
  if (badge) {
    return (
      <Badge
        overlap="circular"
        variant="dot"
        color="primary"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {result}
      </Badge>
    );
  }
  return result;
};

export default AuthorAvatar;
