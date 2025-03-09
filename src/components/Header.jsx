// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = React.memo(() => {
    const { cart } = useCart();  // Get the cart state from the context
    const [cartCount, setCartCount] = useState(0);

    // Update the cart count whenever the cart changes
    useEffect(() => {
        setCartCount(cart.reduce((acc, product) => acc + product.quantity, 0)); // Count total quantity
    }, [cart]);  // This effect runs every time the cart changes


    return (
        <header className="flex justify-between items-center py-4 px-8 bg-[#FDB7EA] text-white">
            {/* Home + Logo */}
            <nav className="flex items-center space-x-2"> 
                <Link to="/" className="flex items-center space-x-2"> 
                    <img 
                        src="https://cdn.pixabay.com/photo/2025/01/18/15/51/heart-9342611_1280.png" 
                        alt="Logo" 
                        className="w-15 h-15"
                    />
                    <span className="text-xl">Home</span>
                </Link>
            </nav>
            
            {/* Contact */}
            <nav className="text-xl">
                <Link to="/contact">Contact</Link>
            </nav>
            
            {/* Cart */}
            <nav>
                <Link to="/cart" className="flex items-center space-x-1 text-xl"> 
                    <span>🛒 Cart</span>
                    <span>{cartCount}</span> {/* Dynamic cart count */}
                </Link>
            </nav>
        </header>
    );
});

export default Header;
