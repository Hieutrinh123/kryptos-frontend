import { useShowAlert } from "#/hooks/useShowAlert";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListResult } from "../commonTypes";
import {
  createComment,
  createReply,
  listComments,
  listReplies,
} from "./commentAPI";
import { Comment, Reply } from "./commentTypes";

export function useComments(postId: number) {
  const { user } = useFirebaseAuthState();
  const handleFetchOlderComments = useCallback(
    (page: number) => {
      return listComments(postId, page, 5);
    },
    [postId]
  );

  const handleCreateNewComment = useMemo(() => {
    if (user) {
      return (content: string) => {
        return createComment(content, postId, user.uid);
      };
    }
  }, [postId, user]);

  return useFetchAndAdd<Comment>(
    1,
    handleFetchOlderComments,
    handleCreateNewComment
  );
}

export function useCommentReplies(commentId: number) {
  const { user } = useFirebaseAuthState();
  const handleFetchOlderComments = useCallback(
    (page: number) => {
      return listReplies(commentId, page, 5);
    },
    [commentId]
  );

  const handleCreateNewComment = useMemo(() => {
    if (user) {
      return (content: string) => {
        return createReply(content, commentId, user.uid);
      };
    }
  }, [commentId, user]);

  return useFetchAndAdd<Reply>(
    0,
    handleFetchOlderComments,
    handleCreateNewComment
  );
}

type FetchHandler<T> = (page: number) => Promise<ListResult<T>>;
type CreateHandler<T> = (content: string) => Promise<T>;

function useFetchAndAdd<T>(
  firstPage: number,
  onFetch: FetchHandler<T> | undefined,
  onCreate: CreateHandler<T> | undefined
) {
  const [adding, setAdding] = useState<boolean>(false);
  const [lastFetchedPage, setLastFetchedPage] = useState(0);
  const [fetching, setFetching] = useState<boolean>(false);
  const [page, setPage] = useState(firstPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [data, setData] = useState<T[]>([]);
  const showAlert = useShowAlert();

  useEffect(() => {
    if (!fetching && page > lastFetchedPage && onFetch) {
      setFetching(true);
      onFetch(page)
        .then((newListResult) => {
          setData((oldData) => [...oldData, ...newListResult.data]);
          setLastFetchedPage(page);
          if (page >= newListResult.pagination.pageCount) {
            setHasNextPage(false);
          }
        })
        .catch((error) => {
          showAlert(error.message, "error");
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching, lastFetchedPage, onFetch, page, showAlert]);

  const handleAdd = useCallback(
    (content: string) => {
      if (!adding && onCreate) {
        setAdding(true);
        onCreate(content)
          .then((newEntity) => {
            setData((oldData) => [newEntity, ...oldData]);
          })
          .catch((error) => {
            showAlert(error.message, "error");
          })
          .finally(() => {
            setAdding(false);
          });
      }
    },
    [adding, onCreate, showAlert]
  );

  const handleFetchNew = useMemo(() => {
    if (hasNextPage) {
      return () => {
        setPage((page) => page + 1);
      };
    }
    return () => {};
  }, [hasNextPage]);

  return {
    data,
    hasNextPage,
    handleAdd,
    handleFetchNew,
    adding,
    fetching,
  };
}
