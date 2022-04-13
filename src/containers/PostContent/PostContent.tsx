import { useTheme } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./PostContent.module.scss";

interface PostContentProps {
  content?: string | null;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const theme = useTheme();
  useEffect(() => {
    const content = document.querySelector(".js-toc-content");
    if (!content) {
      return;
    }
    const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingMap: { [id: string]: number } = {};

    Array.prototype.forEach.call(headings, function (heading) {
      const id = heading.id
        ? heading.id
        : heading.textContent
            .trim()
            .toLowerCase()
            .split(" ")
            .join("-")
            .replace(/[!@#$%^&*():]/gi, "")
            .replace(/\//gi, "-");
      headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
      if (headingMap[id]) {
        heading.id = id + "-" + headingMap[id];
      } else {
        heading.id = id;
      }
    });
  }, [content]);

  if (!content) {
    return null;
  }
  return (
    <div
      className={`${styles.postContent} js-toc-content ${
        theme.palette.mode === "dark"
          ? styles.postContentDark
          : styles.postContentLight
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostContent;
