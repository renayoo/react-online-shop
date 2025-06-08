// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = React.memo(() => {
    const { cart } = useCart();
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setCartCount(cart.reduce((acc, product) => acc + product.quantity, 0));
    }, [cart]);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <header className="bg-[#FDB7EA] text-white py-4 px-8">
            <div className="flex justify-between items-center">
                {/* Logo and Home */}
                <Link to="/" className="flex items-center space-x-2">
                    <img 
                        src="https://cdn.pixabay.com/photo/2025/01/18/15/51/heart-9342611_1280.png" 
                        alt="Logo" 
                        className="w-10 h-10"
                    />
                    <span className="text-xl">Home</span>
                </Link>

                {/* Hamburger Icon */}
                <button onClick={toggleMenu} className="md:hidden text-3xl focus:outline-none">
                    {menuOpen ? 'x' : '☰'}
                </button>

                {/* Full Menu on Desktop */}
                <nav className="hidden md:flex space-x-8 text-xl">
                    <Link to="/contact">Contact</Link>
                    <Link to="/cart" className="flex items-center space-x-1">
                        <span>🛒 Cart</span>
                        <span>{cartCount}</span>
                    </Link>
                </nav>
            </div>

            {/* Dropdown Menu on Mobile */}
            {menuOpen && (
                <nav className="md:hidden mt-4 flex flex-col space-y-2 text-xl">
                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                    <Link to="/cart" className="flex items-center space-x-1" onClick={toggleMenu}>
                        <span>🛒 Cart</span>
                        <span>{cartCount}</span>
                    </Link>
                </nav>
            )}
        </header>
    );
});

export default Header;