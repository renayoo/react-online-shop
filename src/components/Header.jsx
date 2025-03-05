// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = React.memo(() => {
    console.log("Header is rendering"); // Debugging log

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <nav>
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/contact" className="mr-4">Contact</Link>
            </nav>
            <div>
                <Link to="/cart">
                    <span>🛒 Cart</span>
                    <span>0</span> {/* This will be dynamic */}
                </Link>
            </div>
        </header>
    );
});

export default Header;

