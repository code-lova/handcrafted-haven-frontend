"use client";
import React from "react";
import Image from "next/image";
import images from "../../../public/images";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../core/spinner/LoadingSpinner";
import { useFinalizeOrder } from "@/hooks/useFinalizeOrder";
import Clickbutton from "../core/button/ClickButton";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { loading, success } = useFinalizeOrder(sessionId);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <div className="mb-6">
          <Image
            src={images.success}
            alt="Success"
            width={96}
            height={96}
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl font-playfair font-bold text-olive mb-4">
          Thank You!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been successfully placed. You’ll receive an update once
          it’s on the way.
        </p>

        {success && (
          <Clickbutton
            type="button"
            onClick={() => router.replace("/buyer/orders")}
            text="View your orders"
            className="bg-olive cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-gold transition font-medium"
          />
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
