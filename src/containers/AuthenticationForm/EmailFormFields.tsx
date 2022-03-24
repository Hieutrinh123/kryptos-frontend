import { useInputState } from "#/utils/useInputState";
import { validateEmailPassword } from "@/containers/AuthenticationForm/validator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { SyntheticEvent } from "react";
import { useBoolean } from "usehooks-ts";

interface EmailFormFieldsProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  submitButtonLabel: string;
}

const EmailFormFields: React.FC<EmailFormFieldsProps> = ({
  onSubmit,
  submitButtonLabel,
  loading,
}) => {
  const [email, setEmail, emailError, setEmailError] = useInputState("");
  const [password, setPassword, passwordError, setPasswordError] =
    useInputState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { emailError, passwordError } = validateEmailPassword(
      email,
      password
    );
    if (emailError) {
      setEmailError(emailError);
    } else if (passwordError) {
      setPasswordError(passwordError);
    } else {
      onSubmit(email, password);
    }
  };

  const { value: showPassword, toggle: toggleShowValue } = useBoolean(false);
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} width={320}>
        <TextField
          id="email-password"
          label="Email"
          variant="filled"
          type="email"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          helperText={emailError}
          error={!!emailError}
        />

        <FormControl variant="filled" fullWidth>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <FilledInput
            id="password-input"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPassword(event.target.value)}
            error={!!passwordError}
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
          {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ minHeight: 40 }}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <span>{submitButtonLabel}</span>
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default EmailFormFields;
