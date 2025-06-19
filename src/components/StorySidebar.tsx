"use client";
import React from "react";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCategories } from "@/service/request/category";
import { CategoryProps } from "@/service/request/category/type";
import { filterStory } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";

interface Props {
  onFilter: (
    stories: StoryProps[] | null,
    loading: boolean,
    error: string
  ) => void;
}

const StorySidebar = ({ onFilter }: Props) => {
  const { data: categories } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  console.log("cat", categories);

  const mutation = useMutation({
    mutationFn: filterStory,
    onMutate: () => {
      onFilter(null, true, "");
    },
    onSuccess: (data) => {
      onFilter(data, false, "");
    },
    onError: (err) => {
      onFilter(null, false, err?.message || "Failed to filter stories");
    },
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      price: "",
    },
    onSubmit: (values) => {
      const hasFilter = values.category || values.price;
      if (hasFilter) mutation.mutate(values);
      else onFilter(null, false, ""); // Reset filter
    },
  });

  return (
    <aside className="w-full md:w-64 p-4 bg-white rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Filter By</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <h4 className="font-medium mb-2">Category</h4>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4 className="font-medium mb-2">Price</h4>
          <select
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Any</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500-5000">$500 - $5000</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-olive text-white rounded w-full"
        >
          Apply Filter
        </button>
      </form>
    </aside>
  );
};

export default StorySidebar;
