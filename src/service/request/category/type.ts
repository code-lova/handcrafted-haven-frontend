import * as yup from "yup";
import { createCategorySchema } from "@/schema/category";

export type Category = yup.InferType<typeof createCategorySchema>;

export type createCategoryProps = {
  name: string;
  status: string;
};

export interface CategoryProps {
  _id: string;
  name: string;
  status: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCategoryProps {
  _id: string;
  name: string;
  status: string;
}
