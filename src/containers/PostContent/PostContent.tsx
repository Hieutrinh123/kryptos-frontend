import React from "react";
import styles from "./PostContent.module.scss";

interface PostContentProps {
  postHTML?: string | null;
}

const PostContent: React.FC<PostContentProps> = ({ postHTML }) => {
  if (!postHTML) {
    return null;
  }
  return (
    <div
      className={`${styles.postContent} js-toc-content`}
      dangerouslySetInnerHTML={{ __html: postHTML }}
    />
  );
};

export default PostContent;
