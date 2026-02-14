import { createContext, useState } from "react";

// 1. Create the context with a default value (null is common for objects)
export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};