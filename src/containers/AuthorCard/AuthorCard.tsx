import CompactAuthorCard from "@/containers/AuthorCard/CompactAuthorCard";
import DetailedAuthorCard from "@/containers/AuthorCard/DetailedAuthorCard";
import { Author } from "@/api/types";
import React from "react";

interface AuthorCardProps {
  author: Author;
  variant?: "compact" | "detailed";
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  variant = "compact",
}) => {
  if (variant === "compact") {
    return <CompactAuthorCard author={author} />;
  }
  return <DetailedAuthorCard author={author} />;
};

export default AuthorCard;
