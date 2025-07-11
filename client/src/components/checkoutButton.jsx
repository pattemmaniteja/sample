// ✅ 1. CheckoutButton component (client/src/components/CheckoutButton.jsx)
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ cartItems, userId, children }) {
  const handleClick = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart: cartItems, userId })
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return <button className="pay-btn" onClick={handleClick}>{children}</button>;
}