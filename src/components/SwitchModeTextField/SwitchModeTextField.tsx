import LimitedInput from "@/components/LimitedInput";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, OutlinedTextFieldProps } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";

interface SwitchModeTextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant"> {
  defaultValue: string;
  onSave: (value: string) => void;
  saving?: boolean;
  maximumLength?: number;
}

const SwitchModeTextField: React.FC<SwitchModeTextFieldProps> = ({
  defaultValue,
  onSave,
  saving,
  children,
  maximumLength,
  ...props
}) => {
  const [value, setValue] = useState<string>(defaultValue.toString());

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const [isEditing, setIsEditing] = useState(false);
  const [startedSaving, setStartedSaving] = useState(false);

  useEffect(() => {
    if (isEditing && startedSaving && !saving) {
      // finished saving
      setStartedSaving(false);
      setIsEditing(false);
    }
  }, [isEditing, saving, startedSaving]);

  if (isEditing) {
    return (
      <Stack direction="row" spacing={2}>
        <Box flexGrow={1}>
          <LimitedInput
            {...props}
            variant="outlined"
            maximumLength={maximumLength}
            onChange={(event) => setValue(event.target.value)}
            value={value}
            fullWidth
          />
        </Box>
        {saving ? (
          <CircularProgress />
        ) : (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <IconButton
              onClick={() => {
                setStartedSaving(true);
                onSave(value);
              }}
            >
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
