import { firebaseAuth } from "#/config/firebase";
import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { useUpdateProfile } from "react-firebase-hooks/auth";

export function useFirebaseUpdateProfile() {
  const [update, loading, updateProfileError] = useUpdateProfile(firebaseAuth);

  const showAlert = useShowAlert();
  useShowAlertEffect(getFirebaseAuthErrorMessage(updateProfileError), "error");

  const wrappedUpdate: typeof update = async (profile) => {
    await update(profile);
    showAlert("Cập nhật thông tin cá nhân thành công");
  };

  return {
    update: wrappedUpdate,
    loading,
  };
}
