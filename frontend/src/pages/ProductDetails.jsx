import React, { useState, useContext } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../config/db";
import { ShoppingBag, Star, ChevronLeft, Check, Plus } from "lucide-react";
import { CartContext } from "../context/AddtocartContextProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext);
  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) return <div className="error-state">Product not found</div>;

  // Filter for Related Products (Same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4); // Limit to 4 items

  const addToCart = (id) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <div className="details-page-wrapper">
      <div className="details-page-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Back to Collection
        </button>

        <div className="details-grid">
          {/* Left: Image Section */}
          <div className="image-display">
            <div className="discount-tag">-{discount}%</div>
            <img src={`/${product.img}`} alt={product.name} />
          </div>

          {/* Right: Info Section */}
          <div className="info-display">
            <div className="category-label">{product.category}'s collection</div>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "#ffc107" : "none"} 
                    stroke={i < Math.floor(product.rating) ? "#ffc107" : "#ccc"} 
                  />
                ))}
              </div>
              <span className="reviews-text">({product.totalReviews} reviews)</span>
            </div>

            <div className="detail-price-box">
              <span className="current-price">₦{product.price.toLocaleString()}</span>
              <span className="old-price">₦{product.oldPrice.toLocaleString()}</span>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="selection-group">
              <h3>Select Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="selection-group">
              <h3>Color: {selectedColor}</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-circle ${selectedColor === color ? "active" : ""}`}
                    style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && <Check size={14} color={color.toLowerCase() === 'white' ? '#000' : '#fff'} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="purchase-row">
              <div className="quantity-box">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="main-add-btn" onClick={() => addToCart(product.id)}>
                Add to Bag <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- NEW: RELATED PRODUCTS SECTION --- */}
        <section className="related-section">
          <div className="related-header">
            <h2>You May Also Like</h2>
            <p>Similar styles from the {product.category} collection</p>
          </div>
          
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div 
                className="related-card" 
                key={item.id} 
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  window.scrollTo(0, 0); // Scroll to top when clicking a new product
                }}
              >
                <div className="related-img-wrapper">
                  <img src={`/${item.img}`} alt={item.name} />
                  <button 
                    className="related-quick-add"
                    onClick={(e) => { e.stopPropagation(); addToCart(item.id); }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="related-info">
                  <h4>{item.name}</h4>
                  <p>₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;