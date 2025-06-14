import { signOut as nextAuthSignOut } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/userContext";
import { logoutRequest } from "@/service/request/auth/logoutRequest";

const useSignOut = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();

  const { mutateAsync: logout } = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      // Clear user data in React Query + Context
      queryClient.clear();
      setUser(null);
    },
  });

  const handleSignOut = async () => {
    try {
      await logout(); // Invalidate token on server
    } catch {
      // optional: log error, proceed anyway
    } finally {
      // call NextAuth signOut to clear session cookie
      nextAuthSignOut({ callbackUrl: "/login" });
    }
  };

  return { handleSignOut };
};

export default useSignOut;
