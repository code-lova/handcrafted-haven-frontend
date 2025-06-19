import { userSchema } from "@/schema/auth";
import * as yup from "yup";

export type UserType = yup.InferType<typeof userSchema>;


export interface UserProps {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
}