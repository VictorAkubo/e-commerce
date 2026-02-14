import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import ViewAll from './pages/ViewAll';
import ScrollToTop from './components/ScrollToTop';

// Load Stripe using the publishable key from environment variables

function App() {
  // Optional: log to make sure the key is loaded

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/view-all" element={<ViewAll />} />
      </Routes>
    </>
  );
}

export default App;