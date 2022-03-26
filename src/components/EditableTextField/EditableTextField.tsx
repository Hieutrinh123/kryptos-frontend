import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

interface EditableTextFieldProps {
  defaultValue: string;
  onSave: (value: string) => void;
  loading: boolean;
  label: string;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  defaultValue,
  onSave,
  loading,
  label,
  children,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && isSaving && !loading) {
      // finished saving
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [isEditing, isSaving, loading]);

  const handleSave = () => {
    setIsSaving(true);
    onSave(value);
  };

  if (isEditing) {
    return (
      <Stack direction="row" spacing={2}>
        <TextField
          label={label}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={handleSave}>Lưu</Button>
            <IconButton onClick={() => setIsEditing(false)}>
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Stack>
    );
  }
  return (
    <Stack direction="row" alignItems="center">
      {children}
      <IconButton onClick={() => setIsEditing(true)}>
        <EditIcon />
      </IconButton>
    </Stack>
  );
};

export default EditableTextField;
