import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import { BlogPostCardVariant } from "@/containers/BlogCard/BlogPostCard";
import React from "react";
import CarouselPostList from "./CarouselPostList";
import GridPostList from "./DesktopPostList";

interface ListPostProps {
  posts: Post[];
  desktopVariant?: BlogPostCardVariant;
  mobileCarousel?: boolean;
  hideBookmarkButton?: boolean;
}

const BlogPostList: React.FC<ListPostProps> = ({
  posts,
  mobileCarousel = true,
  desktopVariant = "vertical",
  hideBookmarkButton,
}) => {
  const isDesktop = useIsDesktop();

  if (isDesktop || !mobileCarousel) {
    return (
      <GridPostList
        posts={posts}
        variant={desktopVariant}
        hideBookmarkButton={hideBookmarkButton}
      />
    );
  }

  return (
    <CarouselPostList posts={posts} hideBookmarkButton={hideBookmarkButton} />
  );
};

export default BlogPostList;
