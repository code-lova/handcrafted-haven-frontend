"use client";
import LoaderButtons from "@/components/core/loaders/LoaderButtons";
import LoadingSpinner from "@/components/core/spinner/LoadingSpinner";
import { useUserContext } from "@/context/userContext";
import { userSchema } from "@/schema/auth";
import { updateUserProfile } from "@/service/request/user";
import { UserType } from "@/service/request/user/type";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, isLoading, refetchUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: updateUserProfile,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Successfully Updated your profile");
      refetchUser();
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

  const handleSubmit = (values: UserType) => {
    mutate(values);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-playfair mb-6">
          Update your profile details.🎉
        </h1>
      </div>

      <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-2xl shadow-md">
        <Formik
          initialValues={{
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
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

                <div>
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
                    className="text-red-500 text-sm mb-4"
                  />
                </div>

                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="+123456789"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mb-4"
                  />
                </div>

                <div>
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="address"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mb-4"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
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

                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <LoaderButtons
                  loading={loading}
                  text="Update Profile"
                  type="submit"
                  loadingText="Updating Profile.."
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePage;
