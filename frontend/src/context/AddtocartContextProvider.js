import { createContext, useState } from "react";

// 1. Create the context with a default value (null is common for objects)
export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState("");
    
    

    return (
        <CartContext.Provider value={{ cart, setCart,searchQuery, setSearchQuery }}>
            {children}
        </CartContext.Provider>
    );
};