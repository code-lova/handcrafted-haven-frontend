"use client";
import LoadingSpinner from "../../core/spinner/LoadingSpinner";
import SellerNavbar from "./SellerNavbar";
import { useSession } from "next-auth/react";

const SellerDashbaord = () => {
  //const USER_ROLE: UserRole = "seller";
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SellerNavbar />
      <main className="p-6">
        <h1 className="text-3xl font-playfair mb-6">Welcome Seller!</h1>
        {/* More seller dashboard content will come here */}
        {session?.user?.name || "User"}
      </main>
    </>
  );
};

export default SellerDashbaord;
