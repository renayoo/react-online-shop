// src/pages/CheckoutSuccessPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutSuccessPage = () => {
    const { clearCart, cart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Cart before clearing:", cart);
        clearCart();
        console.log("Cart cleared successfully.");
    }, []); // Runs only once on mount

    const handleBackToStore = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold text-green-600">Thank You for Your Purchase!</h2>
            <p className="mt-2 text-lg">Your order was successful.</p>
            <button
                onClick={handleBackToStore}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
                Back to Store
            </button>
        </div>
    );
};

export default CheckoutSuccessPage;
