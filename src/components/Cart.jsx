// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);

    return (
        <div>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <ul>
            {cartItems.map((item) => (
                <li key={item.id}>
                <p>{item.title}</p>
                <p>Price: ${item.discountedPrice}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                </li>
            ))}
            </ul>
        )}
        <p>Total: ${total}</p>
        </div>
    );
};

export default Cart;
