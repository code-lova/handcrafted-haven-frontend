import * as Yup from "yup";
import { createCommentSchema } from "@/schema/comment";

export type Comment = Yup.InferType<typeof createCommentSchema>;

export interface newCommentProps {
    content: string;
    userId?: string;
    storyId: string;
}

export type CommentProps = {
  storyId: string;
  userId: {
    name: string
  };
  content: string;
  _id?: string;
  createdAt?: string;
};