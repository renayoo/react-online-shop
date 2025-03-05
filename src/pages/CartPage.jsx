// src/pages/CartPage.jsx
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Your Cart</h2>
            <p>This is the Cart Page (under construction).</p>
            
            {/* Button to go to the Checkout Page */}
            <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;
