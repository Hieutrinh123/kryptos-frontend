import { cloudFirestore } from "#/config/firebase";
import { useFirebaseAuthState } from "@/api/hooks/auth/useFirebaseAuthState";
import { useShowAlert } from "#/hooks/useShowAlert";
import { User } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { PostOrPage } from "@tryghost/content-api";
import { useCallback, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useIsMounted } from "usehooks-ts";

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
  const checkIsMounted = useIsMounted();
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
          if (checkIsMounted()) {
            setLoading(false);
          }
        }
      }
    },
    [checkIsMounted, documentRef, showAlert]
  );
  return {
    updatePostInteraction,
    loading,
  };
}

export function useBookmarkPost(post: PostOrPage) {
  const { interaction, loading } = usePostInteraction(post);
  const { updatePostInteraction, loading: loadingUpdatePostInteraction } =
    useUpdatePostInteraction(post);

  const showAlert = useShowAlert();

  const bookmarked = interaction?.bookmarked;

  const toggleBookmark = useCallback(() => {
    updatePostInteraction({ bookmarked: !bookmarked }).then(() => {
      if (bookmarked) {
        showAlert("Đã bỏ lưu bài viết", "success");
      } else {
        showAlert("Đã lưu bài viết", "success");
      }
    });
  }, [bookmarked, showAlert, updatePostInteraction]);

  return {
    bookmarked,
    loading: loading || loadingUpdatePostInteraction,
    toggleBookmark,
  };
}

export function useLikePost(post: PostOrPage) {
  const { interaction, loading } = usePostInteraction(post);
  const { updatePostInteraction, loading: loadingUpdatePostInteraction } =
    useUpdatePostInteraction(post);

  const showAlert = useShowAlert();

  const liked = interaction?.liked;

  const toggleLike = useCallback(() => {
    updatePostInteraction({ liked: !liked }).then(() => {
      if (liked) {
        showAlert("Đã bỏ thích bài viết", "success");
      } else {
        showAlert("Đã thích bài viết", "success");
      }
    });
  }, [liked, showAlert, updatePostInteraction]);

  return {
    liked,
    loading: loading || loadingUpdatePostInteraction,
    toggleLike,
  };
}
