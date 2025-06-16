import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { createStroyProps, StoryProps } from "./type";

export const createStory = async (payload: createStroyProps) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/stories`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "There was a problem creating new story"
    );
  }

  const data = await response.json();
  return data;
};

//Get all stories
export const getAllStories = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occured fetching data.");
  }

  const data = await response.json();
  return data;
};

export const getStoryDetailById = async (storyId: string): Promise<StoryProps> => {
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories/story-detail/${storyId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch story details.");
  }

  const data = await response.json();
  // Handle if API returns array of one item
  if (Array.isArray(data)) {
    return data[0]; // get actual story object
  }

  return data;
};

//Get user stories
export const getUserStories = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/stories/user-stories`,
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
  return data;
};


export const updateStory = async (payload: StoryProps) => {
  const { _id, name, price, description, files, categoryId, sellerId, status } =
    payload;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cleanFiles = files.map(({ _id, ...rest }) => rest);

  const cleanData = {
    name,
    price,
    description,
    files: cleanFiles,
    categoryId,
    sellerId,
    status,
  };
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/stories/${_id}`,
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

export const deleteStory = async (storyId: string) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/stories/${storyId}`,
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
