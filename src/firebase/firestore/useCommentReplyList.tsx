import { useShowAlertEffect } from "#/hooks/useShowAlert";
import {
  collection,
  CollectionReference,
  DocumentReference,
} from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { CommentData } from "./useCommentList";

export function useCommentReplyList(
  commentRef: DocumentReference<CommentData>
) {
  const replyCollectionRef = collection(
    commentRef,
    "replies"
  ) as CollectionReference<CommentData>;

  const [replySnapshots, loading, error] =
    useCollection<CommentData>(replyCollectionRef);
  useShowAlertEffect(error?.message, "error");

  return {
    replyCollection: replyCollectionRef,
    replySnapshots,
    loading,
  };
}
