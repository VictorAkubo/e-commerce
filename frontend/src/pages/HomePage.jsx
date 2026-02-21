import React, { useContext, useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
/*import { products } from "../config/db.js";*/
import { Search, ShoppingCart, Plus, ArrowRight } from 'lucide-react';
import { CartContext } from "../context/AddtocartContextProvider.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [allProduct,setAllProduct] = useState([])
  const { cart, setCart } = useContext(CartContext);
  
  const [searchQuery, setSearchQuery] = useState("");

  // Function to add item to cart
  const addToCart = (id) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  // Reset scroll on mount
  useEffect(() => {
    fetch("http://localhost:5000", { method: "GET" })
      .then(res => res.json())
      .then((data) => {
        setAllProduct(data.product);
        console.log(data);
        window.scrollTo(0, 0);
      })
      .catch(err => console.error("Fetch error:", err));
}, []);

  // Reusable Product Section Component
  const ProductSection = ({ title, category, tagline }) => {
    // Filter products based on category and search bar
    const sectionProducts = allProduct.filter(p => 
      p.category === category && 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4); // Show only top 4 on homepage for a clean look

    if (sectionProducts.length === 0) return null;

    return (
      <section className="category-section">
        <div className="section-header">
          <div className="header-text">
            <h2>{title}</h2>
            <p>{tagline}</p>
          </div>
          <button 
            className="view-all-btn" 
            onClick={() => navigate("/view-all", { state: { category } })}
          >
            View All <ArrowRight size={16}/>
          </button>
        </div>

        <div className="product-grid">
          {sectionProducts.map(product => (
            <div className="product-card" key={product._id} onClick={() => navigate(`/product/${product.id}`)}>
              <div className="card-image-wrapper">
                <img src={`http://localhost:5000/data/uploads/${product.img}`} alt={product.name} className="product-img" />
                <div className="card-overlay">
                   <button 
                    className="quick-add-btn" 
                    onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
                  >
                    <Plus size={18} /> Add to Bag
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="price-row">
                   <p className="product-price">₦{product.price.toLocaleString()}</p>
                   {product.oldPrice && <span className="old-price">₦{product.oldPrice.toLocaleString()}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="homepage-container">  
      {/* Sticky Navigation Bar */}
      <nav className="navbar">
        <h1 className="logo" onClick={() => navigate("/")}>BuyME<span>.</span></h1>
        
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for styles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            <ShoppingCart size={22}/> 
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* Hero Banner Section */}
      {searchQuery.length > 0  ? (
      <h3 className="searched" >Searched: {searchQuery}</h3>
      )
        : (
        <>
                    <header className="hero-section">
        <img src="newhero.jpg" alt="Fashion Hero" className="hero-background" />
        <div className="hero-overlay-content">
          <span className="hero-label">Collection 2026</span>
          <h1>Luxury Comfort <br/> For Everyone</h1>
          <p>Discover the latest trends in premium fashion and essential wear.</p>
          <button className="hero-cta" onClick={() => window.scrollTo({top: 850, behavior: 'smooth'})}>
            Shop Now
          </button>
        </div>
      </header>
      
      {/* Modern Announcement Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item">✨ 10% OFF YOUR FIRST ORDER — CODE: FIRSTBUY</span>
          <span className="ticker-item">🚚 FREE SHIPPING ON ORDERS OVER ₦50,000</span>
          <span className="ticker-item">💎 PREMIUM QUALITY GUARANTEED</span>
          <span className="ticker-item">✨ 10% OFF YOUR FIRST ORDER — CODE: FIRSTBUY WITHIN NIGERIA</span>
        </div>
      </div>
      </>
        )
      }



      {/* Main Product Feed */}
      <main className="main-content">
        <ProductSection 
          title="Men's Collection" 
          category="men" 
          tagline="Tailored for the modern gentleman."
        />
        <ProductSection 
          title="Women's Collection" 
          category="women" 
          tagline="Elegance in every stitch."
        />
        <ProductSection 
          title="Kids' Essentials" 
          category="children" 
          tagline="Soft, durable, and playful styles."
        />
      </main>

      {/* Footer */}
      <footer className="footer-simple">
        <div className="footer-content">
          <p className="footer-logo">BuyME<span>.</span></p>
          <p>© 2026 BuyME Luxury Retail. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;