import * as yup from "yup";

export const createOrderSchema = yup.object().shape({
  buyerId: yup.string().required("Buyer is required"),
  categoryId: yup.string().required("Category is required"),
  storyId: yup.string().required("Story is required"),
  amount: yup
    .number()
    .positive("Amount munt be a positive number")
    .required("Amount is required"),
  quantity: yup
    .number()
    .min(1, "Must have minimum of one item")
    .positive("Quantity must be a positive number")
    .required("quantity is required"),
  totalAmount: yup
    .number()
    .min(0, "Total amount cannot be negative")
    .required("Total amount is required"),
  phone: yup
    .string()
    .min(11, "Number is too short")
    .max(14, "Phone is too long")
    .required("Phone number is required"),
  address: yup
    .string()
    .max(1000, "Address must not exeed 1000 caracters")
    .required("Address is required"),
});
