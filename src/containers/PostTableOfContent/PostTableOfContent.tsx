import { Post } from "@/api/posts";
import * as tocbot from "tocbot";
import styles from "./PostTableOfContent.module.scss";
import React, { useEffect } from "react";

const TOCBOT_OPTIONS = {
  tocSelector: ".js-toc",
  contentSelector: ".js-toc-content",
  headingSelector: "h1, h2, h3",
  activeLinkClass: "active-header",
  headingsOffset: 100,
  scrollSmoothOffset: -100,
};

interface PostTableOfContentProps {
  post: Post;
}

const PostTableOfContent: React.FC<PostTableOfContentProps> = ({ post }) => {
  useEffect(() => {
    tocbot.init(TOCBOT_OPTIONS);
    return () => {
      tocbot.destroy();
    };
  }, []);
  useEffect(() => {
    tocbot.refresh(TOCBOT_OPTIONS);
  }, [post]);

  return (
    <>
      <nav className={`toc js-toc ${styles.postToc}`} />
    </>
  );
};

export default PostTableOfContent;
