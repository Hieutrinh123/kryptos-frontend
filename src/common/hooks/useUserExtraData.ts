import { cloudFirestore } from "#/config/firebase";
import { User } from "@firebase/auth";
import { doc } from "@firebase/firestore";
import firebase from "firebase/compat";
import { useDocument } from "react-firebase-hooks/firestore";
import FirestoreError = firebase.firestore.FirestoreError;

export interface UserExtraData {
  bio?: string;
  phoneNumber?: string;
}

export function useUserExtraData(
  user?: User
): [UserExtraData | undefined, boolean, FirestoreError | undefined] {
  const documentRef = user ? doc(cloudFirestore, "users", user.uid) : undefined;
  const [value, loading, error] = useDocument<UserExtraData>(documentRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const data = value?.data();
  return [data, loading, error];
}
