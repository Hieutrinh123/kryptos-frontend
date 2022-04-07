import { useShowAlert } from "#/hooks/useShowAlert";
import { Author } from "@/api";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { cloudFirestore } from "@/firebase/firebase";
import {
  collectionGroup,
  doc,
  DocumentReference,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

export interface AuthorFollow {
  authorId: string;
  followed: boolean;
}

function useAuthorDocumentRef(author: Author) {
  const { user } = useFirebaseAuthState();

  return useMemo(() => {
    if (user) {
      return doc(
        cloudFirestore,
        "users",
        user.uid,
        "author_interaction",
        author.id.toString()
      ) as DocumentReference<AuthorFollow>;
    }
    return undefined;
  }, [author.id, user]);
}

export function useAuthorFollow(author: Author) {
  const [updating, setUpdating] = useState(false);
  const authorDocumentRef = useAuthorDocumentRef(author);
  const showAlert = useShowAlert();
  const [authorFollow, loading, error] =
    useDocumentData<AuthorFollow>(authorDocumentRef);

  const handleUpdateFollow = useCallback(
    async (value: Omit<AuthorFollow, "authorId">) => {
      if (authorDocumentRef) {
        setUpdating(true);
        try {
          await setDoc<AuthorFollow>(
            authorDocumentRef,
            { ...value, authorId: author.id },
            {
              merge: true,
            }
          );
        } catch (e) {
          const error = e as Error;
          showAlert(error.message, "error");
        } finally {
          setUpdating(false);
        }
      }
    },
    [author.id, authorDocumentRef, showAlert]
  );

  return {
    followed: authorFollow?.followed,
    loading,
    error,
    updating,
    handleUpdateFollow,
  };
}

export function useCountFollow(author: Author) {
  const authorQuery = useMemo(
    () =>
      query(
        collectionGroup(cloudFirestore, "author_interaction"),
        where("authorId", "==", author.id.toString())
      ),
    [author.id]
  );

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDocs(authorQuery).then((snapshots) => {
      setCount(snapshots.size);
      setLoading(false);
    });
  }, [authorQuery]);

  return {
    count,
    loading,
  };
}
