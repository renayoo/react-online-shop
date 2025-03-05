// src/pages/CartPage.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    // Function to calculate total price, considering discounted price if applicable
    const getTotalPrice = () => {
        return cart
            .reduce((total, product) => total + (product.discountedPrice || product.price), 0)
            .toFixed(2);
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product, index) => {
                            return (
                                <li key={index}>
                                    <p>{product.title}</p>
                                    <p>
                                        {/* If discounted price exists, show the discounted price with original price crossed out */}
                                        {product.discountedPrice ? (
                                            <>
                                                <span className="line-through text-gray-500">
                                                    ${product.price.toFixed(2)}{" "}
                                                </span>
                                                <span className="text-red-500">
                                                    ${product.discountedPrice.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            // If no discount, show only the original price
                                            <span>${product.price.toFixed(2)}</span>
                                        )}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                    <p>Total: ${getTotalPrice()}</p>
                </div>
            )}

            <button
                onClick={() => navigate("/checkout-success")}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Proceed to Checkout
            </button>

        </div>
    );
};

export default CartPage;
