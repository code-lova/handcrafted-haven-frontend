"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useCart } from "@/context/CartContext";
import Navbar from "../Navbar";
import { createOrderSchema } from "@/schema/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/spinner/LoadingSpinner";
import { useUserContext } from "@/context/userContext";
import { createStripeSession } from "@/service/request/order";
import toast from "react-hot-toast";
import LoaderButtons from "../core/loaders/LoaderButtons";
import { AlertCircle } from "lucide-react";

const Checkout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const { user } = useUserContext();
  const router = useRouter();
  const { cart, getSubtotal } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect to /login if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/cart");
      toast.error("Your cart is empty. Add some items first.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: user?.phone || "",
      address: user?.address || "",
    },
    validationSchema: createOrderSchema.pick(["phone", "address"]),
    onSubmit: async () => {
      setLoading(true);
      const orderItems = cart.map((item) => ({
        storyId: item.product._id,
        quantity: item.quantity,
      }));

      try {
        const url = await createStripeSession(orderItems);
        router.push(url); // ⏩ redirect to Stripe
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || "Payment failed");
        } else {
          toast.error("Payment failed");
        }
      }finally{
        setLoading(false);
      }
    },
  });

   if (status === "loading" || !user || cart.length === 0) {
    return <LoadingSpinner />;
  }

  const missingShippingInfo = !user.phone || !user.address;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-olive/5 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-playfair font-bold text-rich-brown text-center mb-8">
            Checkout
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {/* Shipping details */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-rich-brown mb-1">
                Shipping Details
              </h2>
              <p className="text-sm text-muted mb-6">
                Pulled from your profile.{" "}
                <Link href="/buyer/profile" className="text-terracotta hover:text-terracotta-dark">
                  Update it there
                </Link>{" "}
                if anything&apos;s changed.
              </p>

              {missingShippingInfo && (
                <div className="flex items-start gap-3 bg-gold/20 text-rich-brown rounded-lg p-4 mb-6 text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>
                    Your profile is missing a phone number or address. Please{" "}
                    <Link href="/buyer/profile" className="font-medium underline">
                      complete your profile
                    </Link>{" "}
                    before placing an order.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-rich-brown mb-1.5">
                    Full Name
                  </label>
                  <input
                    readOnly
                    value={user?.name}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-md text-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rich-brown mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-md text-muted"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-rich-brown mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    readOnly
                    value={user?.address}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-md text-muted"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-rich-brown mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    readOnly
                    value={user?.phone}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-md text-muted"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="text-lg font-semibold text-rich-brown mb-4">
                  Order Summary
                </h2>
                <ul className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <li
                      key={item.product._id}
                      className="flex justify-between items-start gap-3 text-sm border-b border-gray-100 pb-3"
                    >
                      <span className="text-rich-brown">
                        {item.product.name} &times; {item.quantity}
                      </span>
                      <span className="text-muted whitespace-nowrap">
                        ${((item.product.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between font-bold text-lg text-rich-brown mb-6">
                  <span>Total</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>

                <LoaderButtons
                  type="submit"
                  text="Pay Now"
                  loading={loading}
                  loadingText="Processing..."
                  disabled={missingShippingInfo}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
