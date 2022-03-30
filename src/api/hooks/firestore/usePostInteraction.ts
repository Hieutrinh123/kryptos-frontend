import { cloudFirestore } from "#/config/firebase";
import { useShowAlert } from "#/hooks/useShowAlert";
import { useFirebaseAuthState } from "@/api/hooks/auth/useFirebaseAuthState";
import { User } from "@firebase/auth";
import {
  collectionGroup,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { PostOrPage } from "@tryghost/content-api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useIsMounted } from "usehooks-ts";

export interface UserPostInteraction {
  bookmarked?: boolean;
  liked?: boolean;
  viewed?: boolean;
}

export function useInteractionReference(
  user: User | undefined,
  post: PostOrPage
) {
  return useMemo(
    () =>
      user
        ? doc(cloudFirestore, "users", user.uid, "post_interaction", post.id)
        : undefined,
    [user, post]
  );
}

export function usePostInteraction(post: PostOrPage) {
  const { user } = useFirebaseAuthState();
  const checkIsMounted = useIsMounted();
  const documentRef = useInteractionReference(user, post);
  const [interaction, loading, error] =
    useDocumentData<UserPostInteraction>(documentRef);

  const [updating, setUpdating] = useState<boolean>(false);
  const showAlert = useShowAlert();

  const handleUpdateInteraction = useCallback(
    async (interaction: UserPostInteraction) => {
      if (documentRef) {
        setUpdating(true);
        try {
          await setDoc<UserPostInteraction>(documentRef, interaction, {
            merge: true,
          });
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
    [checkIsMounted, documentRef, showAlert]
  );

  return {
    interaction,
    loading: loading,
    updating,
    error,
    handleUpdateInteraction,
  };
}
export function useBookmarkPost(post: PostOrPage) {
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

export function useLikePost(post: PostOrPage) {
  const { interaction, loading, handleUpdateInteraction, updating } =
    usePostInteraction(post);

  const showAlert = useShowAlert();

  const liked = interaction?.liked;

  const toggleLike = useCallback(() => {
    handleUpdateInteraction({ liked: !liked }).then(() => {
      if (liked) {
        showAlert("Đã bỏ thích bài viết", "success");
      } else {
        showAlert("Đã thích bài viết", "success");
      }
    });
  }, [liked, showAlert, handleUpdateInteraction]);

  return {
    liked,
    loading: loading || updating,
    toggleLike,
  };
}

export function useCountInteraction(
  post: PostOrPage,
  field: keyof UserPostInteraction
) {
  const postQuery = useMemo(
    () =>
      query(
        collectionGroup(cloudFirestore, "post_interaction"),
        where(field, "==", true)
      ),
    [field]
  );
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDocs(postQuery).then((snapshots) => {
      setCount(snapshots.size);
      setLoading(false);
    });
  }, [postQuery]);

  return {
    count,
    loading,
  };
}

export function usePostLikeCount(post: PostOrPage) {
  return useCountInteraction(post, "liked");
}

export function usePostViewCount(post: PostOrPage) {
  const { handleUpdateInteraction, updating } = usePostInteraction(post);
  const { count, loading } = useCountInteraction(post, "viewed");

  useEffect(() => {
    handleUpdateInteraction({ viewed: true }).then().catch(console.error);
  }, [handleUpdateInteraction]);

  return { count, loading: loading || updating };
}
