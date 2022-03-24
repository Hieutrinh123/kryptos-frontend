import { AuthError } from "@firebase/auth";

export function getFirebaseAuthErrorMessage(
  error?: AuthError
): string | undefined {
  if (!error) {
    return undefined;
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
