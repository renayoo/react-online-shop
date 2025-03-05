// src/pages/CartPage.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    // Function to calculate total price, considering discounted price if applicable
    const getTotalPrice = () => {
        return cart
            .reduce((total, product) => total + (product.discountedPrice || product.price) * product.quantity, 0)
            .toFixed(2);
    };

    const handleViewProducts = () => {
        navigate("/"); // Navigate to the homepage to view products
    };

    // Function to handle removing a product from the cart
    const handleRemoveProduct = (productId) => {
        removeFromCart(productId);
    };

    // Function to handle updating the quantity manually
    const handleQuantityChange = (productId, e) => {
        if (e.target.value < 1) {
            e.target.value = 1; // Ensure that quantity doesn't go below 1
        }
        updateQuantity(productId, e.target.value);
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <button
                        onClick={handleViewProducts}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        View Products
                    </button>
                </div>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => {
                            return (
                                <li key={product.id} className="flex items-center space-x-4 border-b py-4">
                                    <img
                                        src={product.image.url}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{product.title}</p>
                                        <p>
                                            {/* Show price and discounted price if applicable */}
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
                                                <span>${product.price.toFixed(2)}</span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Quantity controls */}
                                    <div className="flex items-center space-x-2">
                                        {/* Add More button (+) */}
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                        >
                                            +
                                        </button>
                                        
                                        {/* Quantity input field */}
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => handleQuantityChange(product.id, e)}
                                            className="w-16 p-1 border rounded-md text-center"
                                            min="1"
                                        />
                                        
                                        {/* Remove button (X) */}
                                        <button
                                            onClick={() => handleRemoveProduct(product.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        >
                                            X
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-xl font-semibold mt-4">Total: ${getTotalPrice()}</p>

                    <button
                        onClick={() => navigate("/checkout-success")}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
