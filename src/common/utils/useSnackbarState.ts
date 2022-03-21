import { useEffect, useState } from "react";

export function useSnackbarState(
  message: string | null | undefined,
  timeout: number
) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return {
    open,
    onClose: () => setOpen(false),
    autoHideDuration: timeout,
    message: message ?? undefined,
  };
}
