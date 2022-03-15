import CompactAuthorCard from "@/components/AuthorCard/CompactAuthorCard";
import DetailedAuthorCard from "@/components/AuthorCard/DetailedAuthorCard";
import { Author } from "@tryghost/content-api";
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
