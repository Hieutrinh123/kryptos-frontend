import { AuthError } from "@firebase/auth";
import _ from "lodash";

export function getFirebaseAuthErrorMessage(
  error?: Error | AuthError
): string | undefined {
  if (!error) {
    return undefined;
  }

  if (!isAuthError(error)) {
    return error.message;
  }

  switch (error.code) {
    case "auth/wrong-password":
      return "Sai mật khẩu";
    case "auth/invalid-display-name":
      return "Tên người dùng không hợp lệ";
    default:
      return error.code;
  }
}

function isAuthError(error: Error): error is AuthError {
  return _.has(error, "code");
}
