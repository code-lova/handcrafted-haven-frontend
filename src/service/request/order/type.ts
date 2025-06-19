import * as Yup from "yup";
import { createOrderSchema } from "@/schema/order";

export type Order = Yup.InferType<typeof createOrderSchema>;

export type orderProps = {
  storyId: string;
  quantity: number;
};

export type OrderItem = {
  storyId: {
    name: string;
    sellerId: {
      name: string;
    };
  };
  name: string;
  price: number;
  quantity: number;
  _id: string;
};

export type Orders = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};
