import { StoryProps } from "@/service/request/story/type";

export type UserRole = "seller" | "buyer";

export interface RegisterData {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

export type LoaderButtonProps = {
  loading?: boolean;
  text?: string;
  type?: "button" | "submit" | "reset";
  loadingText?: string;
  disabled?: boolean;
};

export type loginProps = {
  email: string;
  password: string;
};

export interface DateFormatterProps {
  createdAt: Date;
}

export interface ClickButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export type CartItem = {
  product: StoryProps;
  quantity: number;
  buyerId: string;
};
