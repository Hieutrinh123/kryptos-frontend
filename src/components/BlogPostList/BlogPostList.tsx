import { useIsDesktop } from "#/styles/responsive";
import { BlogPostCardVariant } from "@/components/BlogCard/BlogPostCard";
import { PostsOrPages } from "@tryghost/content-api";
import React from "react";
import GridPostList from "./DesktopPostList";
import CarouselPostList from "./CarouselPostList";

interface ListPostProps {
  posts: PostsOrPages;
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
