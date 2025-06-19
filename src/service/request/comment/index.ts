import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { newCommentProps } from "./type";

export const createComment = async (payload: newCommentProps) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to start payment session");
  }

  const data = await response.json();
  return data;
};

export const getStoryComments = async (storyId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/story/${storyId}`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to load comments");
  }
  const data = await response.json();
  return data;
};
