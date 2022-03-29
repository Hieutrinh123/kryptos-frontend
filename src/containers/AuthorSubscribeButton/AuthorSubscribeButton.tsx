import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledButton = styled(Button)({
  height: "48px",
  borderRadius: "12px",
});

interface AuthorSubscribeButtonProps extends ButtonProps {}
const AuthorSubscribeButton: React.FC<AuthorSubscribeButtonProps> = (props) => {
  return (
    <StyledButton variant="contained" {...props}>
      <span>Đã theo dõi</span>
    </StyledButton>
  );
};

export default AuthorSubscribeButton;
