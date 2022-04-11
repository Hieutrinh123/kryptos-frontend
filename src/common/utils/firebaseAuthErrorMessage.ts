import { AuthError } from "@firebase/auth";
import _ from "lodash";
import { useTranslation } from "next-i18next";

export function useFirebaseAuthErrorMessage(
  error?: Error | AuthError
): string | undefined {
  const { t } = useTranslation();
  if (!error) {
    return undefined;
  }

  if (!isAuthError(error)) {
    return error.message;
  }

  switch (error.code) {
    case "auth/wrong-password":
      return t("Wrong Password");
    case "auth/invalid-display-name":
      return t("Invalid Display Name");
    default:
      return error.code;
  }
}

function isAuthError(error: Error): error is AuthError {
  return _.has(error, "code");
}
