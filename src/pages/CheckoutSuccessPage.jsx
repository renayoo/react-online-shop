import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Confetti from "react-confetti";

const CheckoutSuccessPage = () => {
    const { clearCart, cart } = useCart();
    const navigate = useNavigate();
    
    // State to control when confetti is shown
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        try {
            // Clear cart upon checkout success
            clearCart();

            // Show confetti when the page loads
            setShowConfetti(true);

            // Hide confetti after 5 seconds
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
        } catch (error) {
            console.error("Error during checkout process:", error);
        }
    }, []); // Runs only once on mount

    const handleBackToStore = () => {
        try {
            navigate("/"); // Navigate back to the store (homepage)
        } catch (error) {
            console.error("Error navigating back to store:", error);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('https://cdn.pixabay.com/photo/2025/01/18/15/49/balloons-9342582_1280.png')",
            }}
        >
            {/* Conditionally render Confetti */}
            {showConfetti && <Confetti />}
            
            {/* Container */}
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
