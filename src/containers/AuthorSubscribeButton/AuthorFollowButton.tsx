import { Author } from "@/api";
import { useAuthorFollow } from "@/firebase/firestore/useAuthorFollow";
import { Button, CircularProgress } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import React from "react";

const StyledButton = styled(Button)({
  height: "48px",
  borderRadius: "12px",
});

interface AuthorFollowButtonProps extends ButtonProps {
  author: Author;
}
const AuthorFollowButton: React.FC<AuthorFollowButtonProps> = ({
  author,
  ...props
}) => {
  const { t } = useTranslation();
  const { followed, handleUpdateFollow, loading, updating } =
    useAuthorFollow(author);

  return (
    <StyledButton
      variant="contained"
      color={followed ? "primary" : "secondary"}
      onClick={
        !loading ? () => handleUpdateFollow({ followed: !followed }) : undefined
      }
      {...props}
    >
      {loading || updating ? (
        <CircularProgress />
      ) : (
        <span>{followed ? t("Unfollow") : t("Follow")}</span>
      )}
    </StyledButton>
  );
};

export default AuthorFollowButton;
