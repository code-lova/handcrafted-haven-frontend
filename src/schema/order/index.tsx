import * as yup from "yup";

export const createOrderSchema = yup.object().shape({
  buyerId: yup.string().required(" Buyer identity is required "),

  phone: yup
    .string()
    .min(11, "Number is too short")
    .max(14, "Phone is too long")
    .required("Update your phone number in profile"),

  address: yup
    .string()
    .max(1000, "Address must not exceed 1000 characters")
    .required("Update your address in your profile"),

  totalAmount: yup
    .number()
    .min(0, "Total amount cannot be negative")
    .required("Total amount is required"),

  items: yup
    .array()
    .of(
      yup.object().shape({
        storyId: yup.string().required("Story ID is required"),
        name: yup.string().required("Story name is required"),
        price: yup
          .number()
          .positive("Price must be a positive number")
          .required("Price is required"),
        quantity: yup
          .number()
          .min(1, "Must have minimum of one item")
          .required("Quantity is required"),
      })
    )
    .min(1, "At least one item is required")
    .required("Items are required"),
});
