import { useIsDesktop } from "#/styles/responsive";
import { BlogCardVariant } from "@/components/BlogCard/BlogCard";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import DesktopPostList from "./DesktopPostList";
import MobileAndTabletPostList from "./MobileAndTabletPostList";

interface ListPostProps {
  posts: PostsOrPages;
  desktopVariant?: BlogCardVariant;
}

const BlogPostList: React.FC<ListPostProps> = ({
  posts,
  desktopVariant = "short",
}) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopPostList posts={posts} variant={desktopVariant} />;
  }

  return <MobileAndTabletPostList posts={posts} />;
};

export default BlogPostList;
