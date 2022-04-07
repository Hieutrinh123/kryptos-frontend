import { cloudFirestore } from "@/firebase/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { UserData } from "@/firebase/firestore/useUserData";
import { doc } from "@firebase/firestore";
import { useMemo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import type { CommentData } from "./useCommentList";

function useUserDocumentRef(uid: string) {
  return useMemo(() => doc(cloudFirestore, "users", uid), [uid]);
}
export function useCommenter(comment: CommentData) {
  const userDocumentRef = useUserDocumentRef(comment.uid);
  const [commenter, loading, error] =
    useDocumentData<UserData>(userDocumentRef);

  useShowAlertEffect(error?.message, "error");

  return {
    commenter,
    loading,
  };
}
