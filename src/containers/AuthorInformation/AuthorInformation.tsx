import Paper from "@mui/material/Paper";
import CompactAuthorInformation from "./CompactAuthorInformation";
import FullAuthorInformation from "./FullAuthorInformation";
import { Author } from "@tryghost/content-api";
import React from "react";

interface AuthorInformationProps {
  author: Author;
  variant: "full" | "compact";
  withoutPaper?: boolean;
}

const AuthorInformation: React.FC<AuthorInformationProps> = ({
  author,
  variant = "full",
  withoutPaper,
}) => {
  const content =
    variant === "full" ? (
      <FullAuthorInformation author={author} />
    ) : (
      <CompactAuthorInformation author={author} />
    );

  if (withoutPaper) {
    return content;
  }

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
      }}
    >
      {content}
    </Paper>
  );
};

export default AuthorInformation;
