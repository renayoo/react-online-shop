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
        navigate("/"); // Navigate back to the store (homepage)
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('https://cdn.pixabay.com/photo/2025/01/18/15/49/balloons-9342582_1280.png')",
            }}
        >
            {/*  Container */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
                <h2 className="text-2xl font-bold text-green-600">Thank You for Your Purchase!</h2>
                <p className="mt-2 text-lg">Your order was successful.</p>
                <button
                    onClick={handleBackToStore}
                    className="mt-4 px-6 py-2 bg-[#B7B1F2] text-white rounded-lg shadow-md hover:bg-[#A59EDD] transition-all duration-300"
                >
                    Back to Store
                </button>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;
