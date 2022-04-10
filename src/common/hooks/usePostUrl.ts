import { Post } from "@/api";
import { useEffect, useState } from "react";

export function usePostUrl(post: Post | undefined): string | undefined {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined" && post) {
      const pageLink = `${location.protocol}//${location.host}/posts/${post.slug}`;
      setUrl(pageLink);
    }
  }, [post]);
  return url;
}
