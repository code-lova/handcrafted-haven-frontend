import * as yup from "yup";
import { createStorySchema } from "@/schema/story";

export type Story = yup.InferType<typeof createStorySchema>;

export interface createStroyProps {
  name: string;
  files: string[];
  description: string;
  price: number;
  status: string;
  categoryId: string;
  sellerId: string;
}

export interface StoryProps {
  _id: string;
  uuid: string;
  name: string;
  price: number;
  description: string;
  files: string[];
  status: string;
  categoryId: string | { _id: string; name: string };
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoryFormValues {
  name: string;
  description: string;
  price: number;
  status: string;
  categoryId: string;
  sellerId: string | undefined;
  files: string[];
  previews: string[];
  files_upload: File[];
}