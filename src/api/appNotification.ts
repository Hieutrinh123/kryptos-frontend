import { useFollowedAuthorIds } from "@/firebase/firestore/useAuthorFollow";
import _ from "lodash";
import { useEffect, useState } from "react";
import { listPosts, Post } from "./posts";

export interface AppNotification {
  post: Post;
  viewed: boolean;
}

function useLastNotificationSeen() {
  const [time, setTime] = useState<Date>();
  useEffect(() => {
    const timeString = localStorage.getItem("last_notification_seen_time");
    let time: Date;
    if (timeString) {
      time = new Date(timeString);
    } else {
      time = new Date(0);
    }
    setTime(time);
    localStorage.setItem(
      "last_notification_seen_time",
      new Date().toISOString()
    );
  }, []);
  return time ?? new Date(0);
}

interface HookResult {
  notifications?: AppNotification[];
  loading: boolean;
  hasUnread: boolean;
}

export function useNotifications(): HookResult {
  const { ids: authorIds, loading: loadingIds } = useFollowedAuthorIds();
  const [notifications, setNotifications] = useState<AppNotification[]>();
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const lastSeenTime = useLastNotificationSeen();

  useEffect(() => {
    const filteredIds = authorIds.filter((id) => !_.isNil(id));
    if (filteredIds.length) {
      setLoadingNotifications(true);
      listPosts(1, 9, {
        filter: {
          author: {
            id: {
              _in: authorIds,
            },
          },
        },
      })
        .then((fetchedPosts) => {
          const newNotifications = fetchedPosts.data.map((post) => {
            const postUpdateTime = new Date(post.updated_at);
            return {
              post,
              viewed: lastSeenTime > postUpdateTime,
            };
          });
          setNotifications(newNotifications);
        })
        .finally(() => {
          setLoadingNotifications(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(authorIds), lastSeenTime]);
  const hasUnread = _.some(
    notifications,
    (notification) => !notification.viewed
  );
  return {
    notifications,
    loading: loadingIds || loadingNotifications,
    hasUnread,
  };
}
