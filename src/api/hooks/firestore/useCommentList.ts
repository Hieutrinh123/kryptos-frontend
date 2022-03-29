import { cloudFirestore } from "#/config/firebase";
import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { useFirebaseAuthState } from "@/api/hooks/auth/useFirebaseAuthState";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  Timestamp,
} from "@firebase/firestore";
import { PostOrPage } from "@tryghost/content-api";
import { useCallback, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export interface CommentData {
  content: string;
  uid: string;
  timestamp?: Timestamp;
}

export const commentConverter = {
  toFirestore(comment: CommentData): DocumentData {
    return {
      content: comment.content,
      uid: comment.uid,
      timestamp: comment.timestamp,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): CommentData {
    const data = snapshot.data(options)!;
    return {
      content: data.content,
      uid: data.uid,
      timestamp: data.timestamp,
    };
  },
};

export function getCommentCollectionRef(post: PostOrPage) {
  return collection(cloudFirestore, "posts", post.id, "comments").withConverter(
    commentConverter
  );
}

export function useCommentSnapshotList(post: PostOrPage) {
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
