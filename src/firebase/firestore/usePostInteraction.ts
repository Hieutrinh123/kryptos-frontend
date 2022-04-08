import { useShowAlert } from "#/hooks/useShowAlert";
import { Post } from "@/api";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { cloudFirestore } from "@/firebase/firebase";
import { User } from "@firebase/auth";
import {
  collectionGroup,
  doc,
  DocumentReference,
  Query,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useCollectionOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useIsMounted } from "usehooks-ts";

export interface UserPostInteraction {
  bookmarked?: boolean;
  liked?: boolean;
  viewed?: boolean;
  id: string;
}

export function useInteractionReference(user: User | undefined, post: Post) {
  return useMemo(
    () =>
      user
        ? (doc(
            cloudFirestore,
            "users",
            user.uid,
            "post_interaction",
            post.id.toString()
          ) as DocumentReference<UserPostInteraction>)
        : undefined,
    [user, post]
  );
}

export function usePostInteraction(post: Post) {
  const { user } = useFirebaseAuthState();
  const checkIsMounted = useIsMounted();
  const documentRef = useInteractionReference(user, post);
  const [interaction, loading, error] =
    useDocumentData<UserPostInteraction>(documentRef);

  const [updating, setUpdating] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const handleUpdateInteraction = useCallback(
    async (interaction: Partial<UserPostInteraction>) => {
      if (documentRef) {
        setUpdating(true);
        try {
          await setDoc<UserPostInteraction>(
            documentRef,
            { ...interaction, id: post.id.toString() },
            {
              merge: true,
            }
          );
        } catch (e) {
          const error = e as Error;
          showAlert(error.message, "error");
        } finally {
          if (checkIsMounted()) {
            setUpdating(false);
          }
        }
      }
    },
    [checkIsMounted, documentRef, post.id, showAlert]
  );

  return {
    interaction,
    loading: loading,
    updating,
    error,
    handleUpdateInteraction,
  };
}
export function useBookmarkPost(post: Post) {
  const { interaction, loading, handleUpdateInteraction, updating } =
    usePostInteraction(post);

  const showAlert = useShowAlert();

  const bookmarked = interaction?.bookmarked;

  const toggleBookmark = useCallback(() => {
    handleUpdateInteraction({ bookmarked: !bookmarked }).then(() => {
      if (bookmarked) {
        showAlert("Đã bỏ lưu bài viết", "success");
      } else {
        showAlert("Đã lưu bài viết", "success");
      }
    });
  }, [bookmarked, showAlert, handleUpdateInteraction]);

  return {
    bookmarked,
    loading: loading || updating,
    toggleBookmark,
  };
}

export function useLikePost(post: Post) {
  const { t } = useTranslation();
  const { interaction, loading, handleUpdateInteraction, updating } =
    usePostInteraction(post);

  const showAlert = useShowAlert();

  const liked = interaction?.liked;

  const toggleLike = useCallback(() => {
    handleUpdateInteraction({ liked: !liked }).then(() => {
      if (liked) {
        showAlert(t("Post Unliked"), "success");
      } else {
        showAlert(t("Post Liked"), "success");
      }
    });
  }, [handleUpdateInteraction, liked, showAlert, t]);

  return {
    liked,
    loading: loading || updating,
    toggleLike,
  };
}

export function usePostIdsWithInteraction(field: keyof UserPostInteraction): {
  ids: string[];
  loading: boolean;
} {
  const postQuery = useMemo(
    () =>
      query(
        collectionGroup(cloudFirestore, "post_interaction"),
        where(field, "==", true)
      ) as Query<UserPostInteraction>,
    [field]
  );

  const [snapshot, loading] = useCollectionOnce(postQuery);

  const ids = snapshot?.docs.map((snapshot) => snapshot.data().id) ?? [];

  return {
    ids,
    loading,
  };
}

export function useListPostInteraction(
  post: Post,
  field: keyof UserPostInteraction
) {
  const postQuery = useMemo(
    () =>
      query(
        collectionGroup(cloudFirestore, "post_interaction"),
        where(field, "==", true),
        where("id", "==", post.id.toString())
      ) as Query<UserPostInteraction>,
    [field, post.id]
  );

  const [snapshot, loading] = useCollectionOnce(postQuery);

  return {
    snapshot,
    loading,
  };
}

export function usePostLikeCount(post: Post) {
  const { snapshot, loading } = useListPostInteraction(post, "liked");
  return { count: snapshot?.size, loading };
}

export function usePostViewCount(post: Post) {
  const { handleUpdateInteraction, updating } = usePostInteraction(post);
  const { snapshot, loading } = useListPostInteraction(post, "viewed");

  useEffect(() => {
    handleUpdateInteraction({ viewed: true }).then().catch(console.error);
  }, [handleUpdateInteraction]);

  return { count: snapshot?.size, loading: loading || updating };
}
