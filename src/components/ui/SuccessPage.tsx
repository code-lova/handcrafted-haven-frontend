"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import images from "../../../public/images";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../Navbar";
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
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-olive/5 flex flex-col items-center justify-center px-4 py-16">
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-10 max-w-md w-full text-center">
          <div className="mb-6">
            <Image
              src={images.success}
              alt="Success"
              width={96}
              height={96}
              className="mx-auto"
            />
          </div>

          {success ? (
            <>
              <h1 className="text-3xl font-playfair font-bold text-rich-brown mb-4">
                Thank You!
              </h1>
              <p className="text-muted text-lg mb-8">
                Your order has been successfully placed. You&apos;ll receive an
                update once it&apos;s on the way.
              </p>
              <Clickbutton
                type="button"
                onClick={() => router.replace("/buyer/orders")}
                text="View Your Orders"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-playfair font-bold text-rich-brown mb-4">
                Confirming Your Order
              </h1>
              <p className="text-muted text-lg mb-8">
                We couldn&apos;t confirm your payment just yet. If you were
                charged, check your orders in a moment or reach out to us.
              </p>
            </>
          )}

          <Link
            href="/story"
            className="block mt-4 text-terracotta font-medium hover:text-terracotta-dark"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
