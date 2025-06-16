"use client";
import React, { useState } from "react";
import SellerNavbar from "../SellerNavbar";
import Clickbutton from "../../../core/button/ClickButton";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, deleteCategory } from "@/service/request/category";
import { CategoryProps } from "@/service/request/category/type";
import images from "../../../../../public/images";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import EditCategoryModal from "@/components/core/modal/EditCategoryModal";
import CategorySkeletonCard from "@/components/core/skeleton/CategorySkeletonCard";

const Category = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const navigation = useRouter();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteCategory } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Refresh the category list
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete category");
    },
  });

  // Close modal and clear selected category
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleEditClick = (category: CategoryProps) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (categoryId: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (userConfirmed) {
      mutateDeleteCategory(categoryId);
    }
  };

  const createCategory = () => {
    navigation.push("/seller/category/create");
  };
  return (
    <div>
      <SellerNavbar />
      <div className="p-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="hidden md:block text-3xl font-playfair mb-6">
            List of all Story Categories! 🎉
          </h1>
          <Clickbutton
            text="Add new category"
            type="button"
            onClick={() => createCategory()}
          />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
            <CategorySkeletonCard />
            <CategorySkeletonCard />
            <CategorySkeletonCard />
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center mt-20 ">
            <p className="text-red-500 text-center">
              Failed to load categories. Try refreshing the page.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col xl:grid grid-cols-3 gap-4 mb-2">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Link href="#">
                  <Image
                    className="rounded-t-lg h-[220px]"
                    src={images.categgory} // this is static for all categories
                    alt={category.name}
                  />
                </Link>
                <div className="p-5">
                  <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {category.name}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {category.status}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Clickbutton
                      type="button"
                      text="View category"
                      onClick={() => handleEditClick(category)}
                    />
                    <button
                      type="button"
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleDeleteClick(category._id)}
                    >
                      <FaTrashAlt size={30} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedCategory && (
        <EditCategoryModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          initialData={selectedCategory}
        />
      )}
    </div>
  );
};

export default Category;
