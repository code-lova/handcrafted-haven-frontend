"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { createStory, updateStory } from "@/service/request/story";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAllCategories } from "@/service/request/category";
import { CategoryProps } from "@/service/request/category/type";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { createStorySchema } from "@/schema/story";
import {
  createStroyProps,
  StoryFormValues,
  StoryProps,
} from "@/service/request/story/type";
import LoaderButtons from "../loaders/LoaderButtons";
import { useSession } from "next-auth/react";
import ImageUpload from "../ImageUpload";

interface StoryModalProps {
  isOpen?: boolean;
  onClose: () => void;
  story?: StoryProps | null;
}

const StoryModal = ({ isOpen, onClose, story }: StoryModalProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const userId = session?.user?.id;
  const isEdit = Boolean(story?._id);

  const { data: categories } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  const createStoryMutation = useMutation({
    mutationFn: createStory,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast.success("New Story Created");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Error creating story");
    },
    onSettled: () => setLoading(false),
  });

  const updateStoryMutation = useMutation({
    mutationFn: updateStory,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast.success("Story updated");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update story");
    },
    onSettled: () => setLoading(false),
  });

  return (
    <div
      className={clsx(
        "fixed overflow-y-scroll top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit Story" : "Add New Story"}
        </h2>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="p-6">
        <Formik
          enableReinitialize
          initialValues={
            {
              name: story?.name || "",
              description: story?.description || "",
              price: story?.price || 0,
              status: story?.status || "",
              categoryId:
                typeof story?.categoryId === "string"
                  ? story?.categoryId
                  : story?.categoryId?._id || "",
              sellerId: story?.sellerId || userId,
              files: story?.files || [],
              previews: [],
              files_upload: [],
              filesToDelete: [],
            } as StoryFormValues
          }
          validationSchema={createStorySchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            try {
              // Upload new files and get URLs
              const uploadedImages = [];
              for (const file of values.files_upload) {
                const res = await uploadToCloudinary(file);
                uploadedImages.push(res);
              }
              // Prepare payload combining:
              const finalFiles = [...values.files, ...uploadedImages];

              // Omit file-related temp fields before sending
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { previews, files_upload, filesToDelete, ...rest } = values;

              const payload: createStroyProps = {
                ...rest,
                files: finalFiles,
                sellerId: rest.sellerId ?? "",
              };

              if (isEdit && story?._id) {
                await updateStoryMutation.mutateAsync({
                  _id: story._id,
                  ...payload,
                });
              } else {
                await createStoryMutation.mutateAsync(payload, {
                    onSuccess: () => {
                        resetForm();
                    },
                });
              }
            } catch (error) {
              toast.error("Failed to submit form");
              console.error(error);
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label>Story Title</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter story title"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="price">Price</label>
                <Field
                  name="price"
                  type="number"
                  placeholder="Enter story price"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="status">Please select a status</label>
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

              <div>
                <label htmlFor="categoryId">Please select a category</label>
                <Field
                  name="categoryId"
                  as="select"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive bg-white"
                >
                  <option value="">Pick a category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive bg-white"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <ImageUpload
                files={values.files}
                previews={values.previews}
                onAdd={(file, preview) => {
                  setFieldValue("files_upload", [...values.files_upload, file]);
                  setFieldValue("previews", [...values.previews, preview]);
                }}
                onRemove={(index) => {
                  if (index < values.files.length) {
                    // Removing a preloaded image: mark for deletion
                    const img = values.files[index];
                    setFieldValue("filesToDelete", [
                      ...values.filesToDelete,
                      img.public_id,
                    ]);
                    // Remove from preloaded files array
                    const newFiles = values.files.filter((_, i) => i !== index);
                    setFieldValue("files", newFiles);
                  } else {
                    // Removing new preview/upload
                    const previewIndex = index - values.files.length;
                    // Revoke the blob URL to free memory
                    const previewUrl = values.previews[previewIndex];
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                    }
                    setFieldValue(
                      "files_upload",
                      values.files_upload.filter((_, i) => i !== previewIndex)
                    );
                    setFieldValue(
                      "previews",
                      values.previews.filter((_, i) => i !== previewIndex)
                    );
                  }
                }}
                onReplace={(index, file, preview) => {
                  if (index < values.files.length) {
                    // Replacing preloaded image: mark old for deletion
                    const img = values.files[index];
                    setFieldValue("filesToDelete", [
                      ...values.filesToDelete,
                      img.public_id,
                    ]);
                    // Remove old from preloaded files
                    const newFiles = values.files.filter((_, i) => i !== index);
                    setFieldValue("files", newFiles);
                    // Add new file to upload + preview
                    setFieldValue("files_upload", [
                      ...values.files_upload,
                      file,
                    ]);
                    setFieldValue("previews", [...values.previews, preview]);
                  } else {
                    // Replacing new preview/upload
                    const previewIndex = index - values.files.length;
                    // Revoke old preview blob URL before replacing
                    const oldPreviewUrl = values.previews[previewIndex];
                    if (oldPreviewUrl) {
                      URL.revokeObjectURL(oldPreviewUrl);
                    }
                    const updatedFilesUpload = [...values.files_upload];
                    const updatedPreviews = [...values.previews];
                    updatedFilesUpload[previewIndex] = file;
                    updatedPreviews[previewIndex] = preview;
                    setFieldValue("files_upload", updatedFilesUpload);
                    setFieldValue("previews", updatedPreviews);
                  }
                }}
              />

              <ErrorMessage
                name="files"
                component="div"
                className="text-red-500 text-sm"
              />

              <LoaderButtons
                loading={loading}
                type="submit"
                text={isEdit ? "Update Story" : "Create Story"}
                loadingText={isEdit ? "Updating Story" : "Creating Story"}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StoryModal;
