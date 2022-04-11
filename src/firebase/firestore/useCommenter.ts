import { Comment } from "@/api";
import { cloudFirestore } from "@/firebase/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { UserData } from "@/firebase/firestore/useUserData";
import { doc } from "@firebase/firestore";
import { useMemo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

function useUserDocumentRef(uid: string) {
  return useMemo(() => doc(cloudFirestore, "users", uid), [uid]);
}
export function useCommenter(comment: Comment) {
  const userDocumentRef = useUserDocumentRef(comment.user_id);
  const [commenter, loading, error] =
    useDocumentData<UserData>(userDocumentRef);

  useShowAlertEffect(error?.message, "error");

  return {
    commenter,
    loading,
  };
}
