"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { getStoryDetailById } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";
import { StoryDetailSkeleton } from "../core/skeleton";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Clickbutton from "../core/button/ClickButton";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { ArrowLeft, Minus, Plus, User } from "lucide-react";

const CommentSection = dynamic(() => import("./CommentSection"), {
  ssr: false,
});

const StoryDetail = () => {
  const { addToCart, cart } = useCart();
  const { data: session } = useSession();
  const buyerId = session?.user?.id;

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
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!buyerId) {
      toast.error("Please login to add items to your cart.");
      return;
    }
    if (story) {
      addToCart(story, quantity);
      toast.success(`${story.name} added to cart`);
    }
  };

  const alreadyInCart = story
    ? cart.some((item) => item.product._id === story._id)
    : false;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          href="/story"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-terracotta mb-6 transition"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </Link>

        {isLoading && <StoryDetailSkeleton />}
        {isError && (
          <div className="text-center py-20 text-red-500">
            Failed to load story details. Try again.
          </div>
        )}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Viewer */}
            <div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 w-full max-w-[420px] mx-auto aspect-square">
                <Image
                  src={
                    story?.files?.[selectedImage]?.secure_url || "/image1.jpeg"
                  }
                  width={420}
                  height={420}
                  alt={story?.name || "story image"}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Thumbnails */}
              {story?.files && story.files.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {story.files.map((file, index) => (
                    <button
                      key={file.public_id}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`cursor-pointer border-2 rounded-lg p-1 w-[70px] h-[70px] transition ${
                        selectedImage === index
                          ? "border-terracotta"
                          : "border-transparent hover:border-gray-200"
                      }`}
                    >
                      <Image
                        src={file.secure_url}
                        alt={`Thumbnail ${index + 1}`}
                        width={70}
                        height={70}
                        className="rounded object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="inline-block text-xs font-medium uppercase tracking-wide text-olive bg-olive/10 px-3 py-1 rounded-full mb-3">
                {typeof story?.categoryId === "string"
                  ? "Unknown"
                  : story?.categoryId.name}
              </span>

              <h1 className="text-3xl font-playfair font-bold text-rich-brown mb-2">
                {story?.name}
              </h1>

              <p className="text-2xl text-terracotta font-semibold mb-3">
                ${story?.price?.toFixed(2)}
              </p>

              <p className="flex items-center gap-1.5 text-muted mb-6">
                <User size={16} />
                By{" "}
                <span className="font-medium text-rich-brown">
                  {typeof story?.sellerId === "string"
                    ? "Unknown"
                    : story?.sellerId?.name}
                </span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                {story?.description}
              </p>

              {!alreadyInCart && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-medium text-rich-brown">
                    Quantity
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-muted hover:text-rich-brown disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      disabled={quantity >= 10}
                      className="p-2 text-muted hover:text-rich-brown disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}

              <Clickbutton
                onClick={handleAddToCart}
                type="button"
                disabled={alreadyInCart}
                text={alreadyInCart ? "Already in Cart" : "Add to Cart"}
              />
            </div>
          </div>
        )}

        {/* Reviews */}
        {story?._id && <CommentSection storyId={story?._id} />}
      </div>
      <Footer />
    </>
  );
};

export default StoryDetail;
