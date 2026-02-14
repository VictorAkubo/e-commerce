import React, { useState, useContext } from "react";
import "./ViewAll.css";
import { products } from "../config/db";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/AddtocartContextProvider";
import { SlidersHorizontal, Plus, ShoppingBag,ShoppingCart,Search} from "lucide-react";

const ViewAll = () => {
  const navigate = useNavigate();
  const {cart, setCart } = useContext(CartContext);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (id) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  // 1. Filter Logic
  const filteredProducts = products.filter((p) => 
    filter === "all" ? true : p.category === filter &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-low") return a.price - b.price;
    if (sortOrder === "price-high") return b.price - a.price;
    if (sortOrder === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <>
     <nav className="navbar">
        <h1 className="logo" onClick={() => navigate("/")}>BuyME<span>.</span></h1>
        {
        filter === "all" ? (
        <></>
        )
        : (
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for styles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        )
        }

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            <ShoppingCart size={22}/> 
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </nav>
    <div className="view-all-wrapper">
      <header className="view-all-header">
        <div className="header-content">
        {!searchQuery && <h1>Explore Everything</h1>}
          <p>Showing {sortedProducts.length} items</p>
        </div>

        <div className="controls-bar">
          <div className="filter-group">
            <button className={filter === "all" ? "active" : ""} onClick={() => {
            setSearchQuery("");
            setFilter("all");
            }}>All</button>
            <button className={filter === "men" ? "active" : ""} onClick={() => setFilter("men")}>Men</button>
            <button className={filter === "women" ? "active" : ""} onClick={() => setFilter("women")}>Women</button>
            <button className={filter === "children" ? "active" : ""} onClick={() => setFilter("children")}>Kids</button>
          </div>

          <div className="sort-group">
            <SlidersHorizontal size={18} />
            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </header>

      <main className="master-grid">
        {sortedProducts.map((product) => (
          <div className="view-all-card" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <div className="view-all-img-wrapper">
              <img src={`/${product.img}`} alt={product.name} />
              <button 
                className="view-all-quick-add"
                onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="view-all-info">
              <span className="v-category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="v-price-row">
                <p className="v-price">₦{product.price.toLocaleString()}</p>
                <div className="v-rating">★ {product.rating}</div>
              </div>
            </div>
          </div>
        ))}
      </main>
      
      {sortedProducts.length === 0 && (
        <div className="no-results">
          <ShoppingBag size={50} />
          <h2>No items found in this category.</h2>
        </div>
      )}
    </div>
    </>
  );
};

export default ViewAll;