"use client";

import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createCategorySchema } from "@/schema/category";
import { updateCategory } from "@/service/request/category";
import { CategoryProps } from "@/service/request/category/type";
import LoaderButtons from "../loaders/LoaderButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: CategoryProps; // Initial data for the form
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: updateCategory,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setLoading(false);
      onClose();
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred updating the category");
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (values: CategoryProps) => {
    mutate(values);
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Category
                </Dialog.Title>

                <Formik
                  initialValues={initialData}
                  validationSchema={createCategorySchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      <div className="space-y-6 mt-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category Name
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Status
                          </label>
                          <Field
                            as="select"
                            name="status"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                          >
                            <option value="">Select a status</option>
                            <option value="active">Active</option>
                            <option value="not-active">Not-Active</option>
                          </Field>
                          <ErrorMessage
                            name="slug"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-4">
                        <button
                          type="button"
                          className="rounded-md w-[400px] cursor-pointer bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                        <LoaderButtons
                          loading={loading}
                          loadingText="Saving..."
                          type="submit"
                          text="Save"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditCategoryModal;
