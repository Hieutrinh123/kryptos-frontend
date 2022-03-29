import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { collection, DocumentReference } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { commentConverter, CommentData } from "./useCommentList";

export function useCommentReplyList(
  commentRef: DocumentReference<CommentData>
) {
  const replyCollection = collection(commentRef, "replies").withConverter(
    commentConverter
  );

  const [replySnapshots, loading, error] =
    useCollection<CommentData>(replyCollection);
  useShowAlertEffect(error?.message, "error");

  return {
    replyCollection,
    replySnapshots,
    loading,
  };
}