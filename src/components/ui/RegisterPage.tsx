"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registrationSchema } from "@/schema/auth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "@/service/request/auth/registerRequest";
import { RegisterData } from "@/types";
import LoaderButtons from "../core/loaders/LoaderButtons";

const RegisterPage = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: registerRequest,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Registration was successful");
      navigate.push("/login");
      setLoading(false);
    },
    onError: (error) => {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (values: RegisterData) => {
    console.log("values submitting", values);
    mutate(values);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-white">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-playfair">
          Create an Account
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            role: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="max-w-md mx-auto">
              <div className="mb-5">
                <label htmlFor="firstname">Full Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="firstname">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="firstname"> Please select a role</label>
                <Field
                  name="role"
                  as="select"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive bg-white"
                >
                  <option value="">Select a role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password"> Password </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <LoaderButtons
                loading={loading}
                text="Create Account"
                type="submit"
                loadingText="Creating Account"
              />
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-olive underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
