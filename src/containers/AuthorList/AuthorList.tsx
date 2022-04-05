import { useIsMobile } from "#/styles/responsive";
import { Author } from "@/api";
import MobileAuthorList from "@/containers/AuthorList/MobileAuthorList";
import React from "react";
import DesktopAndTabletAuthorList from "./DesktopAndTabletAuthorList";

interface AuthorListProps {
  authors: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <MobileAuthorList authors={authors} />;
  }
  return <DesktopAndTabletAuthorList authors={authors} />;
};

export default AuthorList;
