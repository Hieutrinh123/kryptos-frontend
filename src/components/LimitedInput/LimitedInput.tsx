import { TextFieldProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { ChangeEventHandler, useState } from "react";

interface LimitedInputProps extends Omit<TextFieldProps, "variant"> {
  variant: "outlined" | "filled" | "standard";
  maximumLength?: number;
}

const LimitedInput: React.FC<LimitedInputProps> = ({
  maximumLength,
  onChange,
  error,
  helperText,
  ...props
}) => {
  const [customError, setCustomError] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
    const newValue = event.target.value;
    if (maximumLength && newValue.length > maximumLength) {
      setCustomError(`Độ dài tối đa: ${maximumLength} ký tự.`);
      return;
    }
    if (customError) {
      setCustomError("");
    }
    onChange && onChange(event);
  };

  return (
    <TextField
      {...props}
      onChange={handleChange}
      error={error || !!customError}
      helperText={helperText ?? customError}
    />
  );
};

export default LimitedInput;
