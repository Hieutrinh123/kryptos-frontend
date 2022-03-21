import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

interface AlertSnackbarProps extends SnackbarProps {
  severity: AlertProps["severity"];
  message?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
Alert.displayName = "CustomAlert";

const AlertSnackbar: React.FC<AlertSnackbarProps> = (props) => {
  const { severity, onClose, message } = props;
  return (
    <Snackbar {...props}>
      <Alert
        severity={severity}
        onClose={(event) => {
          onClose && onClose(event, "escapeKeyDown");
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
