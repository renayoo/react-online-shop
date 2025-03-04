// src/components/Footer.jsx
import React from 'react';

const Footer = React.memo(() => {
    console.log("Footer is rendering"); // Debugging log

    return (
        <footer className="p-4 bg-gray-800 text-white text-center">
            <p>&copy; 2025 React Online Shop</p>
        </footer>
    );
});

export default Footer;
