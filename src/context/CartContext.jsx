// src/context/CartContext.jsx
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
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                // If the product already exists, increase the quantity
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }  // Update quantity
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }]; // Add product with quantity 1 if new
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Function to update quantity of an item
    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: parseInt(quantity, 10) } // Update quantity
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access the cart
export const useCart = () => {
    return useContext(CartContext);
};
