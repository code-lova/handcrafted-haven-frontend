import ProfilePage from "@/components/dashboard/seller/profile/ProfilePage";
import SellerNavbar from "@/components/dashboard/seller/SellerNavbar";
import React from "react";

const page = () => {
  return (
    <div>
      <SellerNavbar />
      <ProfilePage />
    </div>
  );
};

export default page;
