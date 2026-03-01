import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    
    const [searchQuery, setSearchQuery] = useState("");

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, searchQuery, setSearchQuery }}>
            {children}
        </CartContext.Provider>
    );
};