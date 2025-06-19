"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hero from "../Hero";
import { useQuery } from "@tanstack/react-query";
import { getStoryDetailById } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";
import { StoryDetailSkeleton } from "../core/skeleton";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Clickbutton from "../core/button/ClickButton";
import dynamic from "next/dynamic";
const CommentSection = dynamic(() => import("./CommentSection"), { ssr: false });


const StoryDetail = () => {
  const { addToCart, cart } = useCart();
  const params = useParams();
  const storyId = params?.id as string;

  const {
    data: story,
    isLoading,
    isError,
  } = useQuery<StoryProps>({
    queryKey: ["story", storyId],
    queryFn: () => getStoryDetailById(storyId),
    enabled: !!storyId,
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    if (story) {
      addToCart(story);
      toast.success(`${story.name} added to cart`);
    }
  };

  const alreadyInCart = story
    ? cart.some((item) => item.product._id === story._id)
    : false;

  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {isLoading && <StoryDetailSkeleton />}
        {isError && (
          <div className="text-center py-20 text-red-500">
            Failed to load story details. Try again.
          </div>
        )}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Viewer */}
            <div>
              <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center mb-4 w-full max-w-[400px] mx-auto aspect-[1/1]">
                <Image
                  src={
                    story?.files?.[selectedImage]?.secure_url || "/image1.jpeg"
                  }
                  width={400}
                  height={400}
                  alt={story?.name || "story image"}
                  className="rounded-lg object-cover h-[350px]"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {story?.files?.map((file, index) => (
                  <div
                    key={file.public_id}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer border-2 rounded-lg p-1 w-[70px] h-[70px] ${
                      selectedImage === index
                        ? "border-gold"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={file.secure_url}
                      alt={`Thumbnail ${index + 1}`}
                      width={70}
                      height={70}
                      className="rounded object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-playfair font-bold mb-4">
                {story?.name}
              </h1>
              <p className="text-olive text-xl font-semibold mb-3">
                Category:{" "}
                {typeof story?.categoryId === "string"
                  ? "Unknown"
                  : story?.categoryId.name}
              </p>
              <p className="text-olive text-xl font-semibold mb-2">
                ${story?.price?.toFixed(2)}
              </p>
              <p className="text-olive text-xl font-semibold mb-2">
                Creator:{" "}
                {typeof story?.sellerId === "string"
                  ? "Unknown"
                  : story?.sellerId?.name}
              </p>

              <p className="text-gray-700 mb-6">{story?.description}</p>
             
              <Clickbutton
                onClick={handleAddToCart}
                type="button"
                disabled={alreadyInCart}
                text={alreadyInCart ? "Already in Cart" : "Add to Cart"}
                className={alreadyInCart ? "text-white" : "text-white"}
              />
            </div>
          </div>
        )}

        {/* Reviews */}
       { story?._id && <CommentSection storyId={story?._id}/>}
      </div>
      <Footer />
    </>
  );
};

export default StoryDetail;
