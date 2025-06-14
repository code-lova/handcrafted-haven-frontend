import React from "react";
import CreateCategory from "@/components/dashboard/seller/category/CreateCategory";
import SellerNavbar from "@/components/dashboard/seller/SellerNavbar";

const page = () => {
  return (
    <div>
      <SellerNavbar />
      <CreateCategory />
    </div>
  );
};

export default page;
