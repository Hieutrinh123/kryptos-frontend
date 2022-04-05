import { cloudFirestore } from "@/firebase/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { UserData } from "@/firebase/firestore/useUserData";
import { doc } from "@firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import type { CommentData } from "./useCommentList";

function getUserDocumentRef(uid: string) {
  return doc(cloudFirestore, "users", uid);
}
export function useCommenter(comment: CommentData) {
  const userDocumentRef = getUserDocumentRef(comment.uid);
  const [commenter, loading, error] =
    useDocumentData<UserData>(userDocumentRef);

  useShowAlertEffect(error?.message, "error");

  return {
    commenter,
    loading,
  };
}
