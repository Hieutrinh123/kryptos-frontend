import { cloudFirestore } from "#/config/firebase";
import { useFirebaseAuthState } from "#/hooks/auth/useFirebaseAuthState";
import { useShowAlert } from "#/hooks/useShowAlert";
import { User } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { PostOrPage } from "@tryghost/content-api";
import { useCallback, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

export interface UserPostInteraction {
  bookmarked?: boolean;
  liked?: boolean;
}

export function getDocumentRef(user: User | undefined, post: PostOrPage) {
  return user
    ? doc(cloudFirestore, "users", user.uid, "posts", post.id)
    : undefined;
}

export function usePostInteraction(post: PostOrPage) {
  const { user } = useFirebaseAuthState();
  const documentRef = getDocumentRef(user, post);
  const [interaction, loading, error] =
    useDocumentData<UserPostInteraction>(documentRef);
  return { interaction, loading, error };
}

export function useUpdatePostInteraction(post: PostOrPage) {
  const { user } = useFirebaseAuthState();
  const documentRef = getDocumentRef(user, post);

  const [loading, setLoading] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const updatePostInteraction = useCallback(
    async (interaction: UserPostInteraction) => {
      if (documentRef) {
        setLoading(true);
        try {
          await setDoc<UserPostInteraction>(documentRef, interaction);
        } catch (e) {
          const error = e as Error;
          showAlert(error.message, "error");
        } finally {
          setLoading(false);
        }
      }
    },
    [documentRef, showAlert]
  );
  return {
    updatePostInteraction,
    loading,
  };
}
