import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { cloudFirestore, firebaseAuth } from "@/firebase/firebase";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

export interface UserData {
  displayName?: string;
  photoURL?: string;
  bio?: string;
  phoneNumber?: string;
}

export function useUserDocumentRef() {
  const { user } = useFirebaseAuthState();
  return useMemo(
    () => (user ? doc(cloudFirestore, "users", user.uid) : undefined),
    [user]
  );
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
  const documentRef = useUserDocumentRef();

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
  const { handleUpdate: handleUpdateProfile, updating: updatingProfile } =
    useFirebaseUpdateProfile();
  const documentRef = useUserDocumentRef();
  const { t } = useTranslation();

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
          showAlert(t("Successfully updated personal information"), "success");
        } catch (e) {
          const error = e as Error;
          console.error(e);
          showAlert(
            t("Error while updating personal information: ") + error.message,
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    },
    [documentRef, handleUpdateProfile, showAlert, t]
  );

  return {
    handleUpdate,
    updating: loading || updatingProfile,
  };
}
