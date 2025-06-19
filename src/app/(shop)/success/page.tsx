import React, { Suspense } from "react";
import SuccessPage from "@/components/ui/SuccessPage";
import LoadingSpinner from "@/components/core/spinner/LoadingSpinner";

const page = () => {
 return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessPage />
    </Suspense>
  );
};

export default page;
