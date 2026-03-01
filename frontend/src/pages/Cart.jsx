import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/AddtocartContextProvider";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import {ProductContext} from "../context/ProductContext.js"



const Cart = () => {
  const { cart, setCart, } = useContext(CartContext);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const {allProducts,setAllProducts,token} = useContext(ProductContext)
  // ✅ 2. Map cart AFTER products load
  useEffect(() => {
    if (allProducts.length === 0) return;

    const mappedItems = [...new Set(cart)]
      .map((id) => allProducts.find((p) => p._id === id))
      .filter(Boolean)
      .map((p) => {
        const existing = cartItems.find((i) => i._id === p._id);
        return { ...p, count: existing ? existing.count : 1 };
      });

    setCartItems(mappedItems);
  }, [cart, allProducts]);

  // ✅ Increment
  const incrementCount = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  // ✅ Decrement
  const decrementCount = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, count: Math.max(item.count - 1, 1) }
          : item
      )
    );
  };

  // ✅ Remove item
  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );

    setCart((prev) =>
      prev.filter((itemId) => itemId !== id)
    );
  };

  // ✅ Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5;
  

  
  const handleCheckout = async () => {
    setLoading(true);
 const cartItem = [
    {
      name: "Men long",
      price: 700, 
      quantity: 1,
    },
        {
      name: "Men long",
      price: 701, 
      quantity: 1,
    },
  ];

  const res = await fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: {
      Authorization:`Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItem }),
  });

  const data = await res.json();

  // Redirect to Stripe checkout
  window.location.href = data.url;
};

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <div className="cart-main">
          <header className="cart-header">
            <button
              className="back-link"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} /> Continue Shopping
            </button>
            <h1>Your Bag ({cartItems.length} items)</h1>
          </header>

          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={60} />
                <p>Your bag is empty.</p>
                <button onClick={() => navigate("/")}>
                  Explore Products
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-card" key={item._id}>
                  <div className="cart-img-box">
                    <img
                      src={`http://localhost:5000/data/uploads/${item.img}`}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-info">
                    <div className="cart-info-top">
                      <h3>{item.name}</h3>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="cart-controls">
                      <div className="counter-btn">
                        <button onClick={() => decrementCount(item._id)}>
                          −
                        </button>
                        <span>{item.count}</span>
                        <button onClick={() => incrementCount(item._id)}>
                          +
                        </button>
                      </div>

                      <div className="item-pricing">
                        <span>
                          ₦{(item.price * item.count).toLocaleString()}
                        </span>

                        {item.oldPrice && (
                          <span className="old-price">
                            ₦{(
                              item.oldPrice * item.count
                            ).toLocaleString()}
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
            <span>
              {shipping === 0
                ? "FREE"
                : `₦${shipping.toLocaleString()}`}
            </span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>
              ₦{(subtotal + shipping).toLocaleString()}
            </span>
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