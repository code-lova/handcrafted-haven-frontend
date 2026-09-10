"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { signIn, useSession } from "next-auth/react";
import { loginSchema } from "@/schema/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import LoaderButtons from "../core/loaders/LoaderButtons";
import IconField from "../core/IconField";
import PasswordField from "../core/PasswordField";
import AuthShell from "../core/AuthShell";
import { loginProps } from "@/types";
import { useUserContext } from "@/context/userContext";
import { useCart } from "@/context/CartContext";
import LoadingSpinner from "../core/spinner/LoadingSpinner";

const LoginPage = () => {
  const { refetchUser } = useUserContext();
  const { cart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [redirected, setRedirected] = useState(false);

  // Redirect logged-in users to their respective dashboard
  useEffect(() => {
    if (status === "authenticated" && !redirected) {
      const userRole = session?.user?.role;

      if (userRole === "seller") {
        router.push("/seller");
        setRedirected(true);
      } else if (userRole === "buyer") {
        router.push(cart.length > 0 ? "/cart" : "/");
        setRedirected(true);
      } else {
        router.push("/signin");
        setRedirected(true);
      }
    }
  }, [session, status, cart, router, redirected]);

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

  if (status === "loading" || status === "authenticated") {
    return <LoadingSpinner />;
  }

  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Good to see you again"
      description="Sign in to pick up right where you left off — your cart, your orders, and the makers you follow."
      bullets={[
        "Pick up your cart right where you left off",
        "Track and manage your orders",
        "Comment on listings and connect with makers",
      ]}
    >
      <h1 className="text-2xl font-bold mb-1 font-playfair text-rich-brown">
        Login to your account
      </h1>
      <p className="text-muted text-sm mb-6">
        Enter your details to continue.
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <IconField
              type="email"
              name="email"
              id="email"
              label="Email Address"
              placeholder="you@example.com"
              icon={Mail}
            />
            <PasswordField
              name="password"
              id="password"
              label="Password"
              placeholder="Password"
            />
            <LoaderButtons
              loading={loading}
              text="Login Account"
              type="submit"
              loadingText="Processing..."
            />
          </Form>
        )}
      </Formik>
      <p className="text-center text-sm mt-6 text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-terracotta font-medium hover:text-terracotta-dark">
          Register
        </Link>
      </p>
    </AuthShell>
  );
};

export default LoginPage;
