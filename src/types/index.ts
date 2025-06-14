// export interface userType {
//     seller: string,
//     buyer: string,
// }

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
}

export type LoaderButtonProps = {
  loading: boolean;
  text: string;
  type?: "button" | "submit" | "reset";
  loadingText?: string;
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
    type?: "button";
    color: string;
    onClick?: () => void;
}