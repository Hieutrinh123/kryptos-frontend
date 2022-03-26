import { Alert } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import React, { useContext, useEffect, useState } from "react";

type SeverityString = AlertProps["severity"];
export interface SnackbarMessage {
  message: string;
  severity: SeverityString;
  key: number;
}

interface AlertContextProps {
  setAlert: (message: string, severity?: SeverityString) => void;
}

const AlertContext = React.createContext<AlertContextProps>({
  setAlert: () => {},
});

export const AlertProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SeverityString | undefined>();

  const setAlert = (newMessage: string, newSeverity?: SeverityString) => {
    setMessage(newMessage);
    setSeverity(newSeverity);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
    setSeverity(undefined);
  };

  console.log(message, !!message);

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export function useShowAlert() {
  const alertContext = useContext(AlertContext);

  return alertContext.setAlert;
}

export function useShowAlertEffect(
  message?: string,
  severity: SeverityString = "info"
) {
  const alertContext = useContext(AlertContext);
  useEffect(() => {
    if (message) {
      alertContext.setAlert(message, severity);
    }
  }, [alertContext, message, severity]);
}
