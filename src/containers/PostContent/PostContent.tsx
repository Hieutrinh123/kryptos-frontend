import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./PostContent.module.scss";

interface PostContentProps {
  markdownContent?: string | null;
}
interface HeadingProps {
  level: number;
  children: JSX.Element[];
}
const Heading: React.FC<HeadingProps> = ({ level, children }) => {
  // Access actual (string) value of heading
  const heading = children[0];
  let anchor = typeof heading === "string" ? heading.toLowerCase() : "";
  anchor = anchor.replace(/[^a-zA-Z0-9 ]/g, "");
  anchor = anchor.replace(/ /g, "-");
  const Component = getHeadingName(level);
  return <Component id={anchor}>{children}</Component>;
};

function getHeadingName(
  level: number
): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" {
  switch (level) {
    case 1:
      return "h1";
    case 2:
      return "h2";
    case 3:
      return "h3";
    case 4:
      return "h4";
    case 5:
      return "h5";
    case 6:
      return "h6";
    default:
      return "h6";
  }
}

const getHeaderComponents = () => {
  const entries = [1, 2, 3, 4, 5, 6].map((level) => {
    const Renderer: React.FC<{ children: JSX.Element[] }> = ({ children }) => (
      <Heading level={level}>{children}</Heading>
    );
    return [`h${level}`, Renderer];
  });
  return Object.fromEntries(entries);
};

const PostContent: React.FC<PostContentProps> = ({ markdownContent }) => {
  if (!markdownContent) {
    return null;
  }
  return (
    <ReactMarkdown
      className={`${styles.postContent} js-toc-content`}
      components={{
        ...getHeaderComponents(),
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
};

export default PostContent;
