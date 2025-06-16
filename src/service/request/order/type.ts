import { createOrderSchema } from "@/schema/order";
import * as Yup from "yup";

export type Order = Yup.InferType<typeof createOrderSchema>;

export interface orderProps {
  buyerId: string;
  sellerId: string;
  storyId: string;
  categoryId: string;
  amount: number;
  quantity: number;
  totalAmount: number;
}
