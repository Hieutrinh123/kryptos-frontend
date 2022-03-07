import Img from 'public/logo.png';
import { Key } from 'react';

interface PostItem {
  id: string;
  postImage: StaticImageData | string;
  title: string;
  category: string;
  avatarSrc: StaticImageData | string;
  userName: string;
}

const listPosts: PostItem[] = [
  {
    id: 'post#1',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#2',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#3',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#4',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#5',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#6',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#7',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#8',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
  {
    id: 'post#9',
    postImage: Img,
    title: 'Lorem Ipsum Dolor Sit Amet',
    category: 'Subcategory name',
    avatarSrc: Img,
    userName: 'User',
  },
];

export { listPosts };
export type { PostItem };
