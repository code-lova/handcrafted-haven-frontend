import * as yup from "yup";

export const createCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  status: yup
    .string()
    .oneOf(["active", "not-active"], "Invalid status")
    .required("Status is required"),
});
