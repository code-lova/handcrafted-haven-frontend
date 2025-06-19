import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { createCategoryProps, UpdateCategoryProps } from "./type";

export const createCategory = async (payload: createCategoryProps) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
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

//Get all categories
export const getAllCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occured fetching data.");
  }

  const data = await response.json();
  console.log("Fetched categories:", data);
  return data;
};

export const updateCategory = async (payload: UpdateCategoryProps) => {
    const { _id, name, status } = payload;
    const cleanData = { name, status }
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${_id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred fetching data.");
  }

  const data = await response.json();
  return data;
};

export const deleteCategory = async (categoryId: string) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred fetching data.");
  }

  const data = await response.json();
  return data;
};
