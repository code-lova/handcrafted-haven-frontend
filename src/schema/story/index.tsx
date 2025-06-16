import * as yup from "yup";

export const createStorySchema = yup.object().shape({
  name: yup.string().required("Story name is required"),
  files_upload: yup
    .array()
    .of(yup.mixed())
    .max(3, "You can upload up to 3 images"),
  description: yup
    .string()
    .max(1000, "Description must not exeed 1000 caracters")
    .required("Description is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  status: yup
    .string()
    .oneOf(["active", "not-active"], "Invalid status")
    .required("Status is required"),
  categoryId: yup.string().required("Category is required"),
  sellerId: yup.string().required("Seller is required"),

});
