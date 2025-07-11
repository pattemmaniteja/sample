import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    // hit your backend if you want to fetch/order status
    console.log("Stripe session:", sessionId);
  }, [sessionId]);

  return <h2 className="text-green-600 font-bold">Payment successful! 🎉</h2>;
}
