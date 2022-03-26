import { cloudFirestore } from "#/config/firebase";
import { useFirebaseAuthState } from "#/hooks/useFirebaseAuthState";
import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { User } from "@firebase/auth";
import { doc, FirestoreError, setDoc, updateDoc } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";

export interface UserExtraData {
  bio?: string;
  phoneNumber?: string;
}

function getUserDocumentRef(user: User | undefined) {
  return user ? doc(cloudFirestore, "users", user.uid) : undefined;
}

export function useUserExtraData() {
  const { user } = useFirebaseAuthState();
  const documentRef = getUserDocumentRef(user);

  const [data, loading, error] = useDocumentData<UserExtraData>(documentRef);

  useShowAlertEffect(error?.message, "error");

  return { data, loading };
}

export function useCreateNewExtraDataIfNotExisting() {
  const { user } = useFirebaseAuthState();
  const documentRef = getUserDocumentRef(user);

  const [snapshot, loading] = useDocumentOnce<UserExtraData>(documentRef);
  const showAlert = useShowAlert();
  useEffect(() => {
    if (!loading && snapshot && !snapshot.exists() && documentRef) {
      setDoc<UserExtraData>(documentRef, { bio: "This is my bio" }).catch(
        (error) => showAlert(error?.message, "error")
      );
    }
  }, [loading, documentRef, snapshot, showAlert]);
}

export function useUpdateUserExtraData() {
  const { user } = useFirebaseAuthState();
  const documentRef = getUserDocumentRef(user);

  const [loading, setLoading] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const handleUpdate = useCallback(
    async (extraData: UserExtraData) => {
      if (documentRef) {
        setLoading(true);
        try {
          await updateDoc<UserExtraData>(documentRef, extraData);
          showAlert("Thay đổi thông tin cá nhân thành công.", "success");
        } catch (e) {
          const error = e as FirestoreError;
          showAlert(error.message, "error");
        } finally {
          setLoading(false);
        }
      }
    },
    [documentRef, showAlert]
  );

  return {
    update: handleUpdate,
    loading,
  };
}
