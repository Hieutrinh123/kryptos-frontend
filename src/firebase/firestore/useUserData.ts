import { cloudFirestore, firebaseAuth } from "@/firebase/firebase";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { User } from "@firebase/auth";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

export interface UserData {
  displayName?: string;
  photoURL?: string;
  bio?: string;
  phoneNumber?: string;
}

function getUserDocumentRef(user: User | undefined) {
  return user ? doc(cloudFirestore, "users", user.uid) : undefined;
}

function useFirebaseUpdateProfile() {
  const [handleUpdate, updating, updateProfileError] =
    useUpdateProfile(firebaseAuth);

  useShowAlertEffect(getFirebaseAuthErrorMessage(updateProfileError), "error");

  const wrappedUpdate: typeof handleUpdate = async (profile) => {
    await handleUpdate(profile);
  };

  return {
    handleUpdate: wrappedUpdate,
    updating: updating,
  };
}

export function useUserData() {
  const { isNew, user, loading: loadingUser } = useFirebaseAuthState();
  const documentRef = getUserDocumentRef(user);

  const [snapshot, loadingUserData, error] = useDocument<UserData>(documentRef);

  const showAlert = useShowAlert();

  useEffect(() => {
    if (!loadingUserData && snapshot && !snapshot.exists() && documentRef) {
      setDoc<UserData>(documentRef, {
        displayName: user?.displayName ?? "",
        photoURL: user?.photoURL ?? "",
        bio: "This is my bio",
      }).catch((error) => showAlert(error?.message, "error"));
    }
  }, [
    loadingUserData,
    documentRef,
    snapshot,
    showAlert,
    user?.displayName,
    user?.photoURL,
  ]);

  useShowAlertEffect(error?.message, "error");

  const data = snapshot?.data();

  return { user, isNew, data, loading: loadingUser || loadingUserData };
}

export function useUpdateUserData() {
  const { user } = useFirebaseAuthState();
  const { handleUpdate: handleUpdateProfile, updating: updatingProfile } =
    useFirebaseUpdateProfile();
  const documentRef = getUserDocumentRef(user);

  const [loading, setLoading] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const handleUpdate = useCallback(
    async (data: UserData) => {
      if (documentRef) {
        setLoading(true);
        try {
          await updateDoc<UserData>(documentRef, data);
          const profile = _.pick(data, "displayName", "photoURL");
          if (!_.isEmpty(profile)) {
            await handleUpdateProfile(profile);
          }
          showAlert("Thay đổi thông tin cá nhân thành công.", "success");
        } catch (e) {
          const error = e as Error;
          console.error(e);
          showAlert(
            "Lỗi khi cập nhật thông tin cá nhân: " + error.message,
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    },
    [documentRef, handleUpdateProfile, showAlert]
  );

  return {
    handleUpdate,
    updating: loading || updatingProfile,
  };
}
