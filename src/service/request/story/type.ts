import * as yup from "yup";
import { createStorySchema } from "@/schema/story";

export type Story = yup.InferType<typeof createStorySchema>;

export interface createStroyProps {
  name: string;
  files: { secure_url: string; public_id: string }[];
  description: string;
  price: number;
  status: string;
  categoryId: string;
  sellerId: string;
}

export interface StoryProps {
  _id: string;
  uuid?: string;
  name: string;
  price: number;
  description: string;
  files: { secure_url: string; public_id: string; _id?: string }[];
  status: string;
  categoryId: string | { _id: string; name: string };
  sellerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoryFormValues {
  name: string;
  description: string;
  price: number;
  status: string;
  categoryId: string;
  sellerId?: string;
  files: { secure_url: string; public_id: string }[];           // Cloudinary URLs
  previews: string[];        // preview URLs or base64 strings
  files_upload: File[];      // selected File objects before upload
  filesToDelete: string[];
}