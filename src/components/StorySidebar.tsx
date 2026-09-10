"use client";
import React from "react";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
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

  const hasActiveFilters = formik.values.category || formik.values.price;

  const handleClear = () => {
    formik.resetForm();
    onFilter(null, false, "");
  };

  return (
    <aside className="w-full md:w-64 h-fit md:sticky md:top-24 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal size={18} className="text-terracotta" />
        <h3 className="font-semibold text-rich-brown">Filter By</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="category" className="block text-sm font-medium text-rich-brown mb-1.5">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent bg-white"
          >
            <option value="">All</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block text-sm font-medium text-rich-brown mb-1.5">
            Price
          </label>
          <select
            name="price"
            id="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent bg-white"
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
          className="px-4 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-md w-full font-medium transition cursor-pointer"
        >
          Apply Filter
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="mt-2 px-4 py-2.5 text-muted hover:text-rich-brown rounded-md w-full font-medium transition cursor-pointer text-sm"
          >
            Clear Filters
          </button>
        )}
      </form>
    </aside>
  );
};

export default StorySidebar;
