import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { finalizeStripeOrder } from "@/service/request/order";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export function useFinalizeOrder(sessionId: string | null) {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: finalizeStripeOrder,
    onSuccess: () => {
      toast.success("Payment successful. Order created!");
      clearCart();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to finalize order.");
      router.replace("/");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!sessionId) {
      toast.error("Missing session ID");
      router.replace("/");
      return;
    }

    if (!mutation.isPending && !mutation.isSuccess) {
      mutation.mutate(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, success: mutation.isSuccess };
}
