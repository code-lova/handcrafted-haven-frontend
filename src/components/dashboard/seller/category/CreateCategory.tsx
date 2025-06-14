"use client";
import Clickbutton from "@/components/core/button/ClickButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createCategorySchema } from "@/schema/category";
import { createCategory } from "@/service/request/category";
import LoaderButtons from "@/components/core/loaders/LoaderButtons";
import { createCategoryProps } from "@/service/request/category/type";

const CreateCategory = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const goBack = () => {
    navigate.push("/seller/category");
  };

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred creating category");
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (
    values: createCategoryProps,
    { resetForm }: FormikHelpers<createCategoryProps>
  ) => {
    mutate(values, {
      onSuccess: () => {
        resetForm(); // Reset the form after success
      },
    });
  };

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="hidden md:block text-3xl font-playfair mb-6">
          Create New Categoty! 🎉
        </h1>
        <Clickbutton
          text="Back to categories"
          type="button"
          color="olive"
          onClick={() => goBack()}
        />
      </div>

      <div className="max-w-md mx-auto w-full bg-white p-8 rounded-2xl shadow-md">
        <Formik
          initialValues={{ name: "", status: "" }}
          validationSchema={createCategorySchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-5">
              <div className="mb-5">
                <label htmlFor="email">Category Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter category name"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="status"> Please select a status</label>
                <Field
                  name="status"
                  as="select"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive bg-white"
                >
                  <option value="">Select a status</option>
                  <option value="active">Active</option>
                  <option value="not-active">Not-Active</option>
                </Field>
                <ErrorMessage
                  name="status"
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
      </div>
    </div>
  );
};

export default CreateCategory;
