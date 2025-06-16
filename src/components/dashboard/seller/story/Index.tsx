"use client";
import Clickbutton from "@/components/core/button/ClickButton";
import React, { useState } from "react";
import StoryModal from "@/components/core/modal/StoryModal";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { StoryProps } from "@/service/request/story/type";
import { deleteStory, getUserStories } from "@/service/request/story";
import StorySkeletonCard from "@/components/core/skeleton/StorySkeletonCard";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Seller = () => {
  const queryClient = useQueryClient();
  const [openStoryDrawer, setOpenStoryDrawer] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<StoryProps | null>(null);

  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getUserStories,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteStory,
    onSuccess: () => {
      toast.success("Story deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["story"] }); // Refresh the story list
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete story");
    },
  });

  const handleEditStoryDrawer = () => {
    setOpenStoryDrawer(false);
    setSelectedStory(null);
  };

  const editStory = (story: StoryProps) => {
    setSelectedStory(story);
    setOpenStoryDrawer(true);
  };

  const handleDeleteClick = (categoryId: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );
    if (userConfirmed) {
      mutateDelete(categoryId);
    }
  };

  return (
    <div>
      <div className="p-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="hidden md:block text-3xl font-playfair mb-6">
            All Stories! 🎉
          </h1>
          <Clickbutton
            text="Add new story"
            type="button"
            onClick={() => setOpenStoryDrawer(true)}
          />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
            <StorySkeletonCard />
            <StorySkeletonCard />
            <StorySkeletonCard />
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center mt-20 ">
            <p className="text-red-500 text-center">
              Failed to load your Stories. Try refreshing the page.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col xl:grid grid-cols-3 gap-4 mb-2">
            {stories?.map((story) => (
              <div
                key={story._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Image
                  className="rounded-t-lg h-[270px] w-full"
                  src={story.files[0].secure_url}
                  alt={story.name}
                  width={300}
                  height={300}
                />
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h5 className="mb-1 text-lg font-bold tracking-tight text-white">
                      {story.name}
                    </h5>
                    <h5 className="mb-1 text-lg font-bold tracking-tight text-white">
                      ${story.price}
                    </h5>
                  </div>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Category:{" "}
                    {typeof story.categoryId === "string"
                      ? "Unknown"
                      : story.categoryId.name}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {story.status}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Clickbutton
                      type="button"
                      text="View/Edit"
                      onClick={() => editStory(story)}
                    />
                    <button
                      type="button"
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleDeleteClick(story._id)}
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
      {openStoryDrawer && (
        <div className="fixed inset-0 z-40 mt-14 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <StoryModal
            isOpen={openStoryDrawer}
            onClose={handleEditStoryDrawer}
            story={selectedStory}
          />
        </div>
      )}
    </div>
  );
};

export default Seller;
