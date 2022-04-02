import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api/posts";
import { BlogPostCardVariant } from "@/containers/BlogCard/BlogPostCard";
import React from "react";
import GridPostList from "./DesktopPostList";
import CarouselPostList from "./CarouselPostList";

interface ListPostProps {
  posts: Post[];
  desktopVariant?: BlogPostCardVariant;
  mobileCarousel?: boolean;
}

const BlogPostList: React.FC<ListPostProps> = ({
  posts,
  mobileCarousel = true,
  desktopVariant = "short",
}) => {
  const isDesktop = useIsDesktop();

  if (isDesktop || !mobileCarousel) {
    return <GridPostList posts={posts} variant={desktopVariant} />;
  }

  return <CarouselPostList posts={posts} />;
};

export default BlogPostList;
