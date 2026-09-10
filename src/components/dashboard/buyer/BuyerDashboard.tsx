"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useUserContext } from "@/context/userContext";
import { useCart } from "@/context/CartContext";
import { getUserOrders } from "@/service/request/order";
import { getAllStories } from "@/service/request/story";
import { Orders } from "@/service/request/order/type";
import { StoryProps } from "@/service/request/story/type";
import LoadingSpinner from "@/components/core/spinner/LoadingSpinner";
import SellerNavbar from "../seller/SellerNavbar";
import StatCard from "../StatCard";
import QuickActionCard from "../QuickActionCard";
import OrderDetailsModal from "./modal/OrderDetailsModal";
import { ShoppingCart, Package, Wallet, Compass, ClipboardList, UserCircle } from "lucide-react";

const statusStyles: Record<Orders["status"], string> = {
  pending: "bg-gold/20 text-rich-brown",
  confirmed: "bg-olive/10 text-olive",
  shipped: "bg-terracotta/10 text-terracotta",
  delivered: "bg-olive text-white",
  cancelled: "bg-gray-100 text-muted",
};

const BuyerDashboard = () => {
  const { user, isLoading: isUserLoading } = useUserContext();
  const { cart } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);

  const { data: orders, isLoading: isOrdersLoading } = useQuery<Orders[]>({
    queryKey: ["orders"],
    queryFn: getUserOrders,
    refetchOnWindowFocus: false,
  });

  const { data: stories } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getAllStories,
    refetchOnWindowFocus: false,
  });

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  const totalOrders = orders?.length ?? 0;
  const totalSpent = (orders ?? []).reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const recentOrders = [...(orders ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const suggestions = (stories ?? []).filter((s) => s.status === "active").slice(0, 3);

  return (
    <>
      <SellerNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-playfair font-semibold text-rich-brown">
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="text-muted mt-1">
            Here&apos;s what&apos;s new since your last visit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <StatCard icon={ShoppingCart} label="Items in Cart" value={cart.length} accent="terracotta" />
          <StatCard icon={Package} label="Total Orders" value={totalOrders} accent="olive" />
          <StatCard icon={Wallet} label="Total Spent" value={`$${totalSpent.toFixed(2)}`} accent="gold" />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-playfair font-semibold text-rich-brown mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <QuickActionCard
              icon={Compass}
              title="Continue Shopping"
              description="Browse handmade goods from independent makers"
              href="/story"
            />
            <QuickActionCard
              icon={ClipboardList}
              title="Track Orders"
              description="Check the status of what you've bought"
              href="/buyer/orders"
            />
            <QuickActionCard
              icon={UserCircle}
              title="Edit Profile"
              description="Update your contact and shipping details"
              href="/buyer/profile"
            />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-playfair font-semibold text-rich-brown">
              Recent Orders
            </h2>
            {totalOrders > 0 && (
              <Link
                href="/buyer/orders"
                className="text-terracotta font-medium hover:text-terracotta-dark text-sm"
              >
                View all &rarr;
              </Link>
            )}
          </div>

          {isOrdersLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-16 bg-gray-100 rounded-xl" />
              <div className="h-16 bg-gray-100 rounded-xl" />
            </div>
          ) : totalOrders === 0 ? (
            <div className="text-center bg-olive/5 rounded-2xl py-16 px-6">
              <p className="text-lg font-medium text-rich-brown mb-2">
                You haven&apos;t made any orders yet
              </p>
              <p className="text-muted mb-6 max-w-sm mx-auto">
                Start shopping to support independent artisans.
              </p>
              <Link
                href="/story"
                className="inline-block px-6 py-3 rounded-md bg-terracotta hover:bg-terracotta-dark text-white font-medium transition"
              >
                Browse the Marketplace
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <button
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full flex items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition text-left cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-rich-brown truncate">
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                    <p className="text-sm text-muted mt-1">
                      {format(new Date(order.createdAt), "PP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full capitalize ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <p className="text-terracotta font-semibold">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div>
            <h2 className="text-xl font-playfair font-semibold text-rich-brown mb-4">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {suggestions.map((story) => (
                <Link
                  key={story._id}
                  href={`/story/${story.uuid}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="h-44 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={story.files[0]?.secure_url || "/image1.jpeg"}
                      alt={story.name}
                      width={300}
                      height={240}
                      className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-start gap-2 p-4">
                    <h3 className="font-medium text-rich-brown line-clamp-1">{story.name}</h3>
                    <p className="text-terracotta font-semibold whitespace-nowrap">
                      ${story.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
};

export default BuyerDashboard;
