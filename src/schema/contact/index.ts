import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Your name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: yup.string().required("Please select a subject"),
  message: yup
    .string()
    .max(1000, "Message must not exceed 1000 characters")
    .required("Message is required"),
});
