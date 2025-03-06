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

    console.log("Header is rendering"); // Debugging log

    return (
        <header className="flex justify-between items-center p-4 bg-[#FDB7EA] text-white    ">
            <nav className="flex space-x-4">
                <Link to="/" className="text-lg">Home</Link>
                <Link to="/contact" className="text-lg">Contact</Link>
            </nav>
            <nav>
                <Link to="/cart" className="flex items-center space-x-1 text-lg">
                    <span>🛒 Cart</span>
                    <span>{cartCount}</span> {/* Dynamic cart count */}
                </Link>
            </nav>
        </header>
    );
});

export default Header;
