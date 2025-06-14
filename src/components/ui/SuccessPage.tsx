import React from "react";
import Link from "next/link";
import Image from "next/image";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <div className="mb-6">
          <Image
            src="/success.png"
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

        <Link href="/" className="inline-block">
          <button className="bg-olive text-white px-6 py-3 rounded-xl hover:bg-gold transition font-medium">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
