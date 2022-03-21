import {firebaseAuth} from "#/config/firebase";
import {grey} from "#/styles/colors";
import {useSnackbarState} from "#/utils/useSnackbarState";
import AlertSnackbar from "@/components/AlertSnackbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import React, {useState} from "react";
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword,} from "react-firebase-hooks/auth";
import {useBoolean} from "usehooks-ts";

interface EmailAuthenticationFormProps {}

const EmailAuthenticationForm: React.FC<
  EmailAuthenticationFormProps
> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { value: showPassword, toggle: toggleShowValue } = useBoolean(false);
  const [
    signInWithEmail,
    emailSignInUser,
    emailSignInLoading,
    emailSignInError,
  ] = useSignInWithEmailAndPassword(firebaseAuth);
  const [
    signUpWithEmail,
    emailSignUpUser,
    emailSignUpLoading,
    emailSignUpError,
  ] = useCreateUserWithEmailAndPassword(firebaseAuth);

  const signInError = useSnackbarState(emailSignInError?.message, 6000);
  const signUpError = useSnackbarState(emailSignUpError?.message, 6000);

  if (emailSignInUser || emailSignUpUser) {
    return null;
  }
  return (
    <>
      <Stack spacing={3}>
        <TextField
          id="email-password"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <FormControl variant="outlined">
          <InputLabel
            htmlFor="password-input"
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "dark" ? grey[800] : "white",
            })}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="password-input"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowValue}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ minHeight: 40 }}
          onClick={() => signUpWithEmail(email, password)}
        >
          {emailSignUpLoading ? (
            <CircularProgress size={20} />
          ) : (
            <span>Tạo tài khoản</span>
          )}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ minHeight: 40 }}
          onClick={() => signInWithEmail(email, password)}
        >
          {emailSignInLoading ? (
            <CircularProgress size={20} />
          ) : (
            <span>Đăng nhập</span>
          )}
        </Button>
      </Stack>

      <AlertSnackbar
        {...signUpError}
        severity="error"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <AlertSnackbar
        {...signInError}
        severity="error"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
};

export default EmailAuthenticationForm;
