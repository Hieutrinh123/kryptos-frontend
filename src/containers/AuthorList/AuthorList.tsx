import { useIsMobile } from "#/styles/responsive";
import MobileAuthorList from "@/containers/AuthorList/MobileAuthorList";
import DesktopAndTabletAuthorList from "./DesktopAndTabletAuthorList";
import { Authors } from "@tryghost/content-api";
import React from "react";

interface AuthorListProps {
  authors: Authors;
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <MobileAuthorList authors={authors} />;
  }
  return <DesktopAndTabletAuthorList authors={authors} />;
};

export default AuthorList;
