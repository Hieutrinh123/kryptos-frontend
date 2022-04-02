import { cloudFirestore } from "#/config/firebase";
import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { useFirebaseAuthState } from "@/api/hooks/auth/useFirebaseAuthState";
import { Post } from "@/api/posts";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentReference,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { useCallback, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export interface CommentData {
  content: string;
  uid: string;
  timestamp?: Timestamp;
}

export function getCommentCollectionRef(post: Post) {
  return collection(
    cloudFirestore,
    "posts",
    post.id.toString(),
    "comments"
  ) as CollectionReference<CommentData>;
}

export function useCommentSnapshotList(post: Post) {
  const commentCollectionRef = getCommentCollectionRef(post);
  const [commentSnapshots, loading, error] =
    useCollection<CommentData>(commentCollectionRef);
  useShowAlertEffect(error?.message, "error");
  return { commentSnapshots, loading, commentCollectionRef };
}

export function useAddComment(collectionRef: CollectionReference<CommentData>) {
  const { user } = useFirebaseAuthState();
  const [loading, setLoading] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const addComment = useCallback(
    async (commentContent: string) => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        await addDoc<CommentData>(collectionRef, {
          uid: user.uid,
          timestamp: serverTimestamp(),
          content: commentContent,
        });
      } catch (e) {
        const error = e as Error;
        showAlert(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [collectionRef, showAlert, user]
  );
  return {
    addComment,
    loading,
  };
}

export function useUpdateComment(documentRef: DocumentReference<CommentData>) {
  const { user } = useFirebaseAuthState();
  const [loading, setLoading] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const updateComment = useCallback(
    async (commentContent: string) => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        await updateDoc<CommentData>(documentRef, {
          content: commentContent,
        });
      } catch (e) {
        const error = e as Error;
        showAlert(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [documentRef, showAlert, user]
  );
  return {
    updateComment,
    loading,
  };
}
