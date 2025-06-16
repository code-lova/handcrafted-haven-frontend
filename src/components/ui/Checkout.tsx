"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useCart } from "@/context/CartContext";
import Navbar from "../Navbar";
import { createOrderSchema } from "@/schema/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/spinner/LoadingSpinner";

const Checkout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cart, getSubtotal } = useCart();

  // Redirect to /login if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  

  const formik = useFormik({
    initialValues: {
      buyerId: "", // this will be the authenticated user id coming from next auth session
      sellerId: "",
      storyId: "", //Id of the cart in local storage
      categoryId: "",
      amount: "",
      quantity: "",
      totalAmount: "",
      phone: "",
      address: "",
    },
    validationSchema: createOrderSchema,
    onSubmit: (values) => {
      console.log("Billing Info:", values);
      // NEXT: Trigger payment (Stripe/Paystack)
    },
  });

  if (status === "loading" || status === "unauthenticated") {
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
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                className="w-full border px-4 py-2 rounded-md"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full border px-4 py-2 rounded-md"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
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
                onChange={formik.handleChange}
                value={formik.values.phone}
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
              <button
                type="submit"
                className="w-full bg-olive text-white py-3 rounded-lg hover:bg-gold transition"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
