import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { orderProps } from "./type";

//Stripe payment logic
export const createStripeSession = async (items: orderProps[]) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to start payment session");
  }

  const data = await response.json();
  return data.url; // Stripe session URL
};

export const finalizeStripeOrder = async (sessionId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/success`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong while saving order.");
  }

  return data; // Contains message and order
};

export const getUserOrders = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/user-orders`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  // ✅ Handle 404 gracefully
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "There was a problem storing new order"
    );
  }

  const data = await response.json();
  return data;
};
