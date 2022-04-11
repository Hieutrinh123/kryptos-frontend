import { directusInstance, directusListItem } from "../directus";
import {
  Comment,
  commentFields,
  Reply,
  replyFields,
} from "./commentTypes";

export async function listComments(
  postId: number,
  page: number,
  limit: number
) {
  return directusListItem("comments", page, limit, {
    filter: {
      approved: {
        _eq: true,
      },
      post_translation_id: {
        _eq: postId,
      },
    },
    sort: ["-date_created"],
    fields: commentFields,
  });
}

export async function listReplies(
  commentId: number,
  page: number,
  limit: number
) {
  return directusListItem("comment_replies", page, limit, {
    filter: {
      approved: {
        _eq: true,
      },
      comment_id: {
        _eq: commentId,
      },
    },
    sort: ["-date_created"],
    fields: replyFields,
  });
}

export async function createComment(
  content: string,
  postId: number,
  userId: string
) {
  const result = await directusInstance
    .items("comments")
    .createOne({ content, post_translation_id: postId, user_id: userId });
  return result as Comment;
}

export async function createReply(
  content: string,
  commentId: number,
  userId: string
) {
  const result = await directusInstance
    .items("comment_replies")
    .createOne({ content, comment_id: commentId, user_id: userId });
  return result as Reply;
}
