// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Cart context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // State to store the cart items

    // Function to add a product to the cart
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access the cart context
export const useCart = () => {
    return useContext(CartContext);
};
