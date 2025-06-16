"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dashboardPath, setDashboardPath] = useState("/");

  useEffect(() => {
    if (session?.user?.role) {
      switch (session.user.role) {
        case "seller":
          setDashboardPath("/seller");
          break;
        case "buyer":
          setDashboardPath("/");
          break;
        default:
          setDashboardPath("/");
      }
    }
  }, [session]);

  return (
    <div className="p-12 text-center">
      <h1 className="text-red-400 text-4xl">Permission Denied</h1>
      <p className="text-2xl">
        You don’t have permission to view this resource...
      </p>
      <button
        onClick={() => router.push(dashboardPath)}
        className="text-green-700 hover:text-yellow-950 font-bold text-xl py-6 cursor-pointer"
      >
        <span className="mr-2">&#8592;</span> Back to dashboard
      </button>
      <p className="text-[300px] font-bold">403</p>
    </div>
  );
};

export default UnauthorizedPage;
