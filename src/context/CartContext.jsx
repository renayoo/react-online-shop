// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Cart context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load the cart from localStorage when the app starts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    // Save the cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    // Function to add an item to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, product];
            return updatedCart;
        });
    };

    // Function to clear the cart from both state and localStorage
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart"); // Clear cart from localStorage
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access the cart
export const useCart = () => {
    return useContext(CartContext);
};
