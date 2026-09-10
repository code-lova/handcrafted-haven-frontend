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
import { User, Mail, Users } from "lucide-react";
import LoaderButtons from "../core/loaders/LoaderButtons";
import IconField from "../core/IconField";
import PasswordField from "../core/PasswordField";
import AuthShell from "../core/AuthShell";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../core/spinner/LoadingSpinner";

const RegisterPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

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
    mutate(values);
  };

  if (status === "loading" || status === "authenticated") {
    return <LoadingSpinner/>
  }

  return (
    <AuthShell
      eyebrow="Join the Community"
      title="Create your account"
      description="Whether you're here to shop or to sell, there's a place for you at Handcrafted Haven."
      bullets={[
        "Create a profile as a buyer or seller",
        "Shop handmade goods or list your own craft",
        "Be part of a community built around independent makers",
      ]}
    >
      <h1 className="text-2xl font-bold mb-1 font-playfair text-rich-brown">
        Create an account
      </h1>
      <p className="text-muted text-sm mb-6">
        It only takes a minute to get started.
      </p>

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
          <Form>
            <IconField
              type="text"
              name="name"
              id="name"
              label="Full Name"
              placeholder="Full Name"
              icon={User}
            />

            <IconField
              type="email"
              name="email"
              id="email"
              label="Email Address"
              placeholder="you@example.com"
              icon={Mail}
            />

            <div className="mb-5">
              <label htmlFor="role" className="block text-sm font-medium text-rich-brown mb-1.5">
                I&apos;m signing up as
              </label>
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
                <Field
                  name="role"
                  as="select"
                  id="role"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent bg-white"
                >
                  <option value="">Select a role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </Field>
              </div>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <PasswordField
              name="password"
              id="password"
              label="Password"
              placeholder="Password"
            />

            <PasswordField
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
            />

            <LoaderButtons
              loading={loading}
              text="Create Account"
              type="submit"
              loadingText="Creating Account"
            />
          </Form>
        )}
      </Formik>
      <p className="text-center text-sm mt-6 text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-terracotta font-medium hover:text-terracotta-dark">
          Login
        </Link>
      </p>
    </AuthShell>
  );
};

export default RegisterPage;
