"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import { signIn, useSession } from "next-auth/react";
import { loginSchema } from "@/schema/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoaderButtons from "../core/loaders/LoaderButtons";
import { loginProps } from "@/types";
import { useUserContext } from "@/context/userContext";

const LoginPage = () => {
  const { refetchUser } = useUserContext();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect logged-in users to their respective dashboard
  useEffect(() => {
    if (status === "authenticated") {
      switch (session.user.role) {
        case "seller":
          router.push("/seller");
          break;
        case "buyer":
          router.push("/buyer");
          break;
        default:
          router.push("/signin");
      }
    }
  }, [session, status, router]);

  const handleSubmit = async (
    values: loginProps,
    { setSubmitting }: FormikHelpers<loginProps>
  ) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from handling redirects
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      toast.success("Login successful");
      refetchUser();
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-white">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-playfair">
          Login to Your Account
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-5">
              <div className="mb-5">
                <label htmlFor="email">Email Address</label>
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
                  className="text-red-600 text-sm mt-1"
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
              </div>
              <LoaderButtons
                loading={loading}
                text="Login Account"
                type="submit"
                loadingText="Processing..."
              />
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-olive underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
