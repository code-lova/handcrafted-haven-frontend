"use client";

import React from "react";
import { Orders } from "@/service/request/order/type";
import { format } from "date-fns";

interface Props {
  order: Orders;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<Props> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-olive text-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto p-6 relative">
        <button
          className="absolute cursor-pointer top-3 right-3 text-white hover:text-gray-200 text-xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">{order.status}</span>
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {format(new Date(order.createdAt), "PPpp")}
        </p>

        <h3 className="mt-4 mb-2 font-semibold text-lg">Items:</h3>
        <ul className="list-disc list-inside space-y-2">
          {order.items.map((item, idx) => (
            <li key={idx} className="border-b pb-2">
              <p>
                <strong>{item.name}</strong> by{" "}
                <em>{item.storyId?.sellerId?.name || "Unknown Seller"}</em>
              </p>
              <p>
                Quantity: {item.quantity} | Price: ${item.price.toFixed(2)}
              </p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
