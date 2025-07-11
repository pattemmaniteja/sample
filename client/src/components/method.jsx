import "../styles/payMethod.css";
import CheckoutButton from "./checkoutButton";
import { useCart } from '../components/context/cardContext'

  export default function Method() {
      const { cart } = useCart();
      const userId = "guest-user-001";
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
      <div className="payment-wrapper">
        <h2 className="payment-heading">Choose Payment Method</h2>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <div className="icon blue">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <span>Google Pay</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <div className="icon purple">
            <i className="fa-solid fa-mobile-screen-button"></i>
          </div>
          <span>PhonePe</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <div className="icon orange">
            <i className="fa-solid fa-mobile"></i>
          </div>
          <span>UPI</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" defaultChecked />
          <div className="icon black">
            <i className="fa-solid fa-credit-card"></i>
          </div>
          <span>Credit/Debit Card</span>
        </label>
        <div className="checkout-btn-container">
          <CheckoutButton cartItems={cart} userId={userId}>
            Pay ₹{total.toFixed(2)}
          </CheckoutButton>
      </div>
      </div>
    );
  }
