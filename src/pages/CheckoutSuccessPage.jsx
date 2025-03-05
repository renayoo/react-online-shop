// src/pages/CheckoutSuccessPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutSuccessPage = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    // Clear the cart when the component mounts
    useEffect(() => {
        clearCart();  // Clear the cart from both state and localStorage
        console.log("Cart cleared.");
    }, [clearCart]); // Only run when the component mounts, don't add any unnecessary dependencies

    // Function to handle navigation on button click
    const handleBackToStore = () => {
        navigate("/");  // Navigate to the homepage
    };

    return (
        <div>
            <h2>Thank you for your purchase!</h2>
            <p>Your order was successful.</p>
            <button onClick={handleBackToStore}>Back to Store</button>
        </div>
    );
};

export default CheckoutSuccessPage;
