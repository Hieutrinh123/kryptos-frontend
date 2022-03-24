import EmailSignInForm from "@/containers/AuthenticationForm/EmailSignInForm";
import EmailSignUpForm from "@/containers/AuthenticationForm/EmailSignUpForm";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useBoolean } from "usehooks-ts";

interface EmailAuthenticationFormProps {}
const EmailAuthenticationForm: React.FC<
  EmailAuthenticationFormProps
> = ({}) => {
  const { value: isSigningIn, toggle } = useBoolean(true);
  return (
    <Stack spacing={2} width={320} alignItems="center">
      <Typography variant="h4" fontWeight="bold">
        {isSigningIn ? "Đăng nhập" : "Đăng ký"}
      </Typography>
      <Typography variant="subtitle1">
        {isSigningIn
          ? "Nhập email để đăng nhập vào tài khoản"
          : "Nhập email và mật khẩu để đăng nhập"}
      </Typography>

      {isSigningIn ? <EmailSignInForm /> : <EmailSignUpForm />}
      <Link
        onClick={toggle}
        underline="none"
        sx={{ cursor: "pointer" }}
        alignSelf="center"
      >
        {isSigningIn
          ? "Chưa có tài khoản? Đăng ký"
          : "Đã có tài khoản? Đăng nhập"}
      </Link>
    </Stack>
  );
};

export default EmailAuthenticationForm;
