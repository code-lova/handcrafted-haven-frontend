"use client";
import { useUserContext } from "@/context/userContext";
import LoadingSpinner from "../../core/spinner/LoadingSpinner";
import SellerNavbar from "./SellerNavbar";
import { useState } from "react";

const SellerDashbaord = () => {
  const { user, isLoading } = useUserContext();
  //const USER_ROLE: UserRole = "seller";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [analytics, setAnalytics] = useState({
    categoriesCount: 0,
    storiesCount: 0,
    ordersCount: 0,
    buyersCount: 0,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SellerNavbar />
      <div className="p-12">
        <h1 className="text-3xl font-playfair mb-6">Welcome Seller! 🎉</h1>
        {/* More seller dashboard content will come here */}
        <div>
          {user && (
            <div className="mb-8 font-medium text-xl text-gray-700">
              Hello, <span className="font-bold text-olive">{user.name}</span>{" "}
              👋
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-400 via-green-300 to-green-500 text-white transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">Categories Created</h2>
            <p className="text-5xl font-bold">{analytics.categoriesCount}</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 text-white transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">Stories Created</h2>
            <p className="text-5xl font-bold">{analytics.storiesCount}</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 text-white transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">Orders Placed</h2>
            <p className="text-5xl font-bold">{analytics.ordersCount}</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 text-white transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">Total Buyers</h2>
            <p className="text-5xl font-bold">{analytics.buyersCount}</p>
          </div>
        </div>

        <div className="text-center py-10">
          <p className="text-olive font-semibold italic text-4xl">
            Hope you have something new for us today..!!{" "}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-10">
          <div className="bg-olive text-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-playfair mb-4">Keep Growing 🚀</h2>
            <p className="text-lg leading-relaxed font-light">
              Every story you share, every product you create brings value to
              the world.
              <br />
              Inspire. Create. Succeed. 🌟
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashbaord;
