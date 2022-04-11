export interface IComment {
  id: number;
  content: string;
  user_id: string;
  date_created: string;
  approved: boolean;
}

export interface Comment extends IComment {
  post_translation_id?: number;
}

export interface Reply extends IComment {
  comment_id?: number;
}

export const commentFields = [
  "id",
  "content",
  "user_id",
  "date_created",
  "approved",
];
export const replyFields = ["content", "user_id", "date_created", "approved"];
