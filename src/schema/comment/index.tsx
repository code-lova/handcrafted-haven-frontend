import * as yup from "yup";

export const createCommentSchema = yup.object().shape({
  content: yup
    .string()
    .max(1000, "content must not exceed 1000 characters")
    .required("Comtent is required"),
});
