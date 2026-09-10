"use client";
import { useUserContext } from "@/context/userContext";
import LoadingSpinner from "../../core/spinner/LoadingSpinner";
import SellerNavbar from "./SellerNavbar";
import StatCard from "../StatCard";
import QuickActionCard from "../QuickActionCard";
import StorySkeletonCard from "@/components/core/skeleton/StorySkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { getUserStories } from "@/service/request/story";
import { getAllCategories } from "@/service/request/category";
import { StoryProps } from "@/service/request/story/type";
import { CategoryProps } from "@/service/request/category/type";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  CheckCircle2,
  FileEdit,
  Tags,
  PlusCircle,
  ClipboardList,
  UserCircle,
} from "lucide-react";

const SellerDashbaord = () => {
  const { user, isLoading: isUserLoading } = useUserContext();

  const { data: stories, isLoading: isStoriesLoading } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getUserStories,
    refetchOnWindowFocus: false,
  });

  const { data: categories } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  const totalStories = stories?.length ?? 0;
  const activeStories = stories?.filter((s) => s.status === "active").length ?? 0;
  const draftStories = totalStories - activeStories;
  const categoriesAvailable = categories?.length ?? 0;

  const recentStories = [...(stories ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    )
    .slice(0, 6);

  return (
    <>
      <SellerNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-playfair font-semibold text-rich-brown">
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="text-muted mt-1">
            Here&apos;s what&apos;s happening with your shop today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard icon={Package} label="Total Listings" value={totalStories} accent="terracotta" />
          <StatCard icon={CheckCircle2} label="Active Listings" value={activeStories} accent="olive" />
          <StatCard icon={FileEdit} label="Drafts" value={draftStories} accent="gold" />
          <StatCard icon={Tags} label="Categories Available" value={categoriesAvailable} accent="muted" />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-playfair font-semibold text-rich-brown mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <QuickActionCard
              icon={PlusCircle}
              title="Add a Story"
              description="List a new handmade item"
              href="/seller/story"
            />
            <QuickActionCard
              icon={Tags}
              title="Manage Categories"
              description="Organize how buyers browse"
              href="/seller/category"
            />
            <QuickActionCard
              icon={ClipboardList}
              title="View Orders"
              description="See what buyers have ordered"
              href="/seller/orders"
            />
            <QuickActionCard
              icon={UserCircle}
              title="Edit Profile"
              description="Update your seller details"
              href="/seller/profile"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-playfair font-semibold text-rich-brown">
              Recent Listings
            </h2>
            {totalStories > 0 && (
              <Link
                href="/seller/story"
                className="text-terracotta font-medium hover:text-terracotta-dark text-sm"
              >
                View all &rarr;
              </Link>
            )}
          </div>

          {isStoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <StorySkeletonCard />
              <StorySkeletonCard />
              <StorySkeletonCard />
            </div>
          ) : totalStories === 0 ? (
            <div className="text-center bg-olive/5 rounded-2xl py-16 px-6">
              <p className="text-lg font-medium text-rich-brown mb-2">
                You haven&apos;t listed anything yet
              </p>
              <p className="text-muted mb-6 max-w-sm mx-auto">
                Add your first story to start showing up in the marketplace.
              </p>
              <Link
                href="/seller/story"
                className="inline-block px-6 py-3 rounded-md bg-terracotta hover:bg-terracotta-dark text-white font-medium transition"
              >
                Add Your First Story
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentStories.map((story) => (
                <Link
                  key={story._id}
                  href="/seller/story"
                  className="flex gap-4 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={story.files[0]?.secure_url || "/image1.jpeg"}
                      alt={story.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-rich-brown truncate">{story.name}</h3>
                    <p className="text-terracotta font-semibold text-sm mt-1">
                      ${story.price}
                    </p>
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                        story.status === "active"
                          ? "bg-olive/10 text-olive"
                          : "bg-gray-100 text-muted"
                      }`}
                    >
                      {story.status === "active" ? "Active" : "Draft"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerDashbaord;
