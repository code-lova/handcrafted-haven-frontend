import React from "react";
import ProfilePage from "@/components/dashboard/buyer/ProfilePage";
import SellerNavbar from "@/components/dashboard/seller/SellerNavbar";

const page = () => {
  return (
    <div>
      <SellerNavbar />
      <ProfilePage />
    </div>
  );
};

export default page;
