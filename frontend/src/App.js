import './App.css';

import React,{useContext,useState} from 'react';
import { Route, Routes ,useNavigate} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import ViewAll from './pages/ViewAll';
import ScrollToTop from './components/ScrollToTop';
import Auth from './pages/Auth';
import {Menu, Search, ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { CartContext } from "./context/AddtocartContextProvider.js";
import Sidebar from "./pages/Sidebar.jsx"
import Success from "./pages/Success.jsx"
import Cancel from "./pages/Cancel.jsx"

// Load Stripe using the publishable key from environment variables

function App() {
  // Optional: log to make sure the key is loaded
  const navigate=useNavigate()
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { cart, setCart,searchQuery, setSearchQuery} = useContext(CartContext);
  const [openSidebar,setOpenSidebar] = useState(false)


  return (
    <>
      <ScrollToTop />
      {openSidebar && (<Sidebar setOpenSidebar={setOpenSidebar}/>)}
     <nav className="navbar">
                <Menu onClick={()=>setOpenSidebar(!openSidebar)} size={21}/>
        <h1 className="logo" onClick={() => navigate("/")}>Feet fitness<span>.</span></h1>
        
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
          <button className="cart-btn" onClick={() =>{
            if(userDetails){
              navigate("/cart")
            }else{
              navigate("/auth")
            }
          }}>
            <ShoppingCart size={22}/> 
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/view-all" element={<ViewAll />} />
         <Route path="/auth" element={<Auth />} />
           <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </>
  );
}

export default App;