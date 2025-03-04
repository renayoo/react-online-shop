// src/components/CartIcon.js
import React from 'react';
import { Link } from 'react-router-dom';

const CartIcon = ({ itemCount }) => {
    return (
        <Link to="/cart">
        <div className="cart-icon">
            <span>🛒</span>
            <span>{itemCount}</span>
        </div>
        </Link>
    );
    };

export default CartIcon;
