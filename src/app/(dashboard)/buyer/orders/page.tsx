import React from "react";
import Orderspage from "@/components/dashboard/buyer/Orderspage";
import SellerNavbar from "@/components/dashboard/seller/SellerNavbar";

const page = () => {
  return (
    <div>
      <SellerNavbar />
      <Orderspage />
    </div>
  );
};

export default page;
