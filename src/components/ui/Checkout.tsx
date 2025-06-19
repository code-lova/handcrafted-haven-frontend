"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useCart } from "@/context/CartContext";
import Navbar from "../Navbar";
import { createOrderSchema } from "@/schema/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/spinner/LoadingSpinner";
import { useUserContext } from "@/context/userContext";
//import { useMutation } from "@tanstack/react-query";
import { createStripeSession } from "@/service/request/order";
import toast from "react-hot-toast";
import LoaderButtons from "../core/loaders/LoaderButtons";

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
        console.log("order items", orderItems);
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-3xl font-playfair font-bold mb-8 text-center text-olive">
            Checkout
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                readOnly
                value={user?.name}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                readOnly
                value={user?.address}
                className="w-full border px-4 py-2 rounded-md"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                readOnly
                value={user?.phone}
                className="w-full border px-4 py-2 rounded-md"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2 mt-8">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={item.product._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>${(item.product.price || 0) * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${getSubtotal()}</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <LoaderButtons
                type="submit"
                text="Pay Now"
                loading={loading}
                loadingText="Processing..."
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
