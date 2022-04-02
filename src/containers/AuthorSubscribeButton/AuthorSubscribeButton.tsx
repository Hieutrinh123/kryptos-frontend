import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import React from "react";

const StyledButton = styled(Button)({
  height: "48px",
  borderRadius: "12px",
});

interface AuthorSubscribeButtonProps extends ButtonProps {}
const AuthorSubscribeButton: React.FC<AuthorSubscribeButtonProps> = (props) => {
  const { t } = useTranslation();
  return (
    <StyledButton variant="contained" color="secondary" {...props}>
      <span>{t("Follow")}</span>
    </StyledButton>
  );
};

export default AuthorSubscribeButton;
