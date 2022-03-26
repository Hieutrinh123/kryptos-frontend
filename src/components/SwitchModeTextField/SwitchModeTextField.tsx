import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, OutlinedTextFieldProps } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

interface SwitchModeTextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant"> {
  defaultValue: string;
  onSave: (value: string) => void;
  loading?: boolean;
  maximumLength?: number;
}

const SwitchModeTextField: React.FC<SwitchModeTextFieldProps> = ({
  defaultValue,
  onSave,
  loading,
  children,
  maximumLength,
  ...props
}) => {
  const [value, setValue] = useState<string>(defaultValue.toString());
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && isSaving && !loading) {
      // finished saving
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [isEditing, isSaving, loading]);

  const handleChange = (newValue: string) => {
    if (
      maximumLength &&
      newValue.length > maximumLength &&
      newValue.length > value.length
    ) {
      setError(`Maximum length of ${maximumLength} characters exceeded.`);
      setValue(newValue.slice(0, maximumLength));
      return;
    }
    if (error) {
      setError("");
    }
    setValue(newValue);
  };

  const handleSave = () => {
    setIsSaving(true);
    onSave(value);
  };

  if (isEditing) {
    return (
      <Stack direction="row" spacing={2}>
        <Box flexGrow={1}>
          <TextField
            {...props}
            variant="outlined"
            onChange={(event) => handleChange(event.target.value)}
            error={!!error}
            helperText={error}
            value={value}
            fullWidth
          />
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <IconButton onClick={handleSave}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    );
  }
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      {children}
      <IconButton onClick={() => setIsEditing(true)} sx={{ padding: 0 }}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SwitchModeTextField;
