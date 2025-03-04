// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider to wrap the app and provide cart state globally
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (product) => {
        setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
            return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        });
    };

    const removeItemFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, cartItemCount }}>
        {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
