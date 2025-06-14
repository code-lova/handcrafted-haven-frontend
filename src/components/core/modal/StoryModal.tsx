"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { createStory, updateStory } from "@/service/request/story";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAllCategories } from "@/service/request/category";
import { CategoryProps } from "@/service/request/category/type";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { createStorySchema } from "@/schema/story";
import { createStroyProps, StoryFormValues, StoryProps } from "@/service/request/story/type";
import { X, Plus, Camera } from "lucide-react";
import LoaderButtons from "../loaders/LoaderButtons";
import { useSession } from "next-auth/react";

const MAX_IMAGES = 3; // optional limit

interface stroyModalProps {
  isOpen?: boolean;
  onClose: () => void;
  story?: StoryProps | null;
}

const StoryModal = ({ isOpen, onClose, story }: stroyModalProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const userId = session?.user?.id;
  const isEdit = story?._id;

  const { data: categories } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  const CreateStoryMutation = useMutation({
    mutationFn: createStory,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("New Story Created");
      setLoading(false);
      onClose();
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred creating category");
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const updateStoryMutation = useMutation({
    mutationFn: updateStory,
    onSuccess: () => {
      toast.success("Successfully update story");
      //   closeAndReset();  lets reset the form after successful update
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    values: StoryFormValues,
    setFieldValue: (field: keyof StoryFormValues, value: any) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Upload the new image to Cloudinary
      const secureUrl = await uploadToCloudinary(file);

      // Replace the existing image at the given index
      const updatedFiles = [...values.files];
      updatedFiles[index] = secureUrl;

      setFieldValue("files", updatedFiles);

      // If this is an "edit" image that originated from local preview (files_upload), update it too
      const updatedFilesUpload = [...values.files_upload];
      updatedFilesUpload[index] = file;
      setFieldValue("files_upload", updatedFilesUpload);

      // Update the preview too
      const newPreview = URL.createObjectURL(file);
      const updatedPreviews = [...values.previews];
      updatedPreviews[index] = newPreview;
      setFieldValue("previews", updatedPreviews);
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Failed to upload image");
    }
  };

  return (
    <>
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
            initialValues={{
              name: story?.name || "",
              description: story?.description || "",
              price: story?.price || 0,
              status: story?.status || "",
              categoryId:
                typeof story?.categoryId === "string"
                  ? story?.categoryId
                  : story?.categoryId?._id || "",
              sellerId: story?.sellerId || userId,
              files: story?.files || [], // Store cloudinary URLs
              previews: [], // Store base64 previews
              files_upload: [], // Store selected files for upload
            }}
            validationSchema={createStorySchema}
            onSubmit={async (values) => {
              const uploadedImages: string[] = [];
              for (const file of values.files_upload as File[]) {
                const secureUrl = await uploadToCloudinary(file);
                uploadedImages.push(secureUrl);
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { files_upload, previews, ...rest } = values;

              const payload: createStroyProps = {
                ...rest,
                sellerId: rest.sellerId ?? "",
                files: uploadedImages,
              };

              await CreateStoryMutation.mutateAsync(payload);
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
                <div>
                  <label htmlFor="status"> Please select a category</label>
                  <Field
                    name="categoryId"
                    as="select"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive bg-white"
                  >
                    <option value="">Pick a categoy</option>
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

                <div>
                  <label className="block font-medium mb-2">Images</label>

                  <div className="flex flex-wrap gap-3">
                    {values.files.length > 0
                      ? values.files.map((fileUrl: string, idx: number) => (
                          <div key={idx} className="relative w-20 h-20 group">
                            <Image
                              src={fileUrl}
                              alt={`Uploaded ${idx}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded"
                            />
                            {/* Overlay camera icon for replacement */}
                            <label className="absolute inset-0 bg-black/40 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                              <Camera className="w-5 h-5 text-white" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, idx, values, setFieldValue)}
                              />
                            </label>
                          </div>
                        ))
                      : values.previews.map((src: string, idx: number) => (
                          <div key={idx} className="relative w-20 h-20">
                            <Image
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              width={80}
                              height={80}
                              className="rounded object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newFiles = values.files_upload.filter(
                                  (_: File, i: number) => i !== idx
                                );
                                const newPreviews = values.previews.filter(
                                  (_: string, i: number) => i !== idx
                                );
                                setFieldValue("files_upload", newFiles);
                                setFieldValue("previews", newPreviews);
                              }}
                              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ))}

                    {values.files.length === 0 &&
                      values.files_upload.length < MAX_IMAGES && (
                        <label className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
                          <Plus className="w-6 h-6 text-gray-500" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            name="files"
                            onChange={(e) => {
                              const file = e.currentTarget.files?.[0];
                              if (file) {
                                const preview = URL.createObjectURL(file);
                                setFieldValue("files_upload", [
                                  ...values.files_upload,
                                  file,
                                ]);
                                setFieldValue("previews", [
                                  ...values.previews,
                                  preview,
                                ]);
                              }
                            }}
                          />
                        </label>
                      )}
                  </div>
                  <ErrorMessage
                    name="files"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <LoaderButtons
                  loading={loading}
                  type="submit"
                  text={isEdit ? "Update Story" : "Create Story"}
                  loadingText="Creating Story"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default StoryModal;
