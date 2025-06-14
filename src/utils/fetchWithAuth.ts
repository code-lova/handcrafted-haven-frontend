import { signOut, getSession } from "next-auth/react";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might be logged out.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.status === 401) {
    await signOut({ callbackUrl: "/login" });
    throw new Error("Session expired. Please log in again.");
  }

  return response;
};
