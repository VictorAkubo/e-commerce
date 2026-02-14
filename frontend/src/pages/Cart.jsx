import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/AddtocartContextProvider";
import { products } from "../config/db.js";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";


const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mappedItems = [...new Set(cart)]
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => ({ ...p, count: 1 }));
    setCartItems(mappedItems);
  }, [cart]);

  const incrementCount = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );

  const decrementCount = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(item.count - 1, 1) } : item
      )
    );

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((itemId) => itemId !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
  const shipping = subtotal > 50 ? 0 : 5;

const handleCheckout= ()=>{
  setLoading(true)
  setTimeout(() => {
   setLoading(false)
}, 2000);
}
  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <div className="cart-main">
          <header className="cart-header">
            <button className="back-link" onClick={() => navigate("/")}>
              <ArrowLeft size={18} /> Continue Shopping
            </button>
            <h1>Your Bag ({cartItems.length} items)</h1>
          </header>

          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={60} />
                <p>Your bag is empty.</p>
                <button onClick={() => navigate("/")}>Explore Products</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-img-box">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="cart-info">
                    <div className="cart-info-top">
                      <h3>{item.name}</h3>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="cart-controls">
                      <div className="counter-btn">
                        <button onClick={() => decrementCount(item.id)}>−</button>
                        <span>{item.count}</span>
                        <button onClick={() => incrementCount(item.id)}>+</button>
                      </div>
                      <div className="item-pricing">
                        <span>₦{(item.price * item.count).toLocaleString()}</span>
                        {item.oldPrice && (
                          <span className="old-price">
                            ₦{(item.oldPrice * item.count).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>₦{(subtotal + shipping).toLocaleString()}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? "Redirecting..." : "Go to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;