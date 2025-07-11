import '../styles/CartSummary.css';
import { useCart } from '../components/context/cardContext'
import { Link } from 'react-router-dom';
export default function CartSummary(){
     const { cart, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    return(
        <div className="cart-summary">
        <h3>Cart Summary</h3>

        {cart.map(item => (
            <div className="cart-item" key={item.id}>
            <span className="cart-item-title">{item.name}</span>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span className="cart-item-price">₹{item.price}</span>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
            </div>
      ))}

        {/* <div className="cart-item">
            <span className="cart-item-title">Pizza Palace Coupon</span>
            <div style={{ display: "flex", alignItems: "center" }}>
            <span className="cart-item-price">$15.00</span>
            <button className="cart-item-remove">✕</button>
            </div>
        </div>

        <div className="cart-item">
            <span className="cart-item-title">Burger House Coupon</span>
            <div style={{ display: "flex", alignItems: "center" }}>
            <span className="cart-item-price">$12.00</span>
            <button className="cart-item-remove">✕</button>
            </div>
        </div> */}

        {/* <div className="cart-total">
            <span>Total:</span>
            <span>$27.00</span>
        </div> */}
        <div className="cart-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
        </div>

        {/* <div className="cart-points"></div> */}
            <Link to="/payment" className="link-no-style">
                <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
        </div>

    );
}