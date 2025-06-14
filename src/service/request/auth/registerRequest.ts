import { RegisterData } from "@/types";

export const registerRequest = async (payload: RegisterData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred fetching data.");
  }

  const data = await response.json();
  return data;
};
