// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();
    
    // State to store form data
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order placed:", formData);
        navigate("/checkout-success"); // Redirect to success page after "placing order"
    };

    return (
        <div>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
            <h3>Shipping Information</h3>
            <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
            <input type="text" name="city" placeholder="City" required onChange={handleChange} />
            <input type="text" name="zip" placeholder="ZIP Code" required onChange={handleChange} />

            <h3>Payment Information</h3>
            <input type="text" name="cardNumber" placeholder="Card Number" required onChange={handleChange} />
            <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" required onChange={handleChange} />
            <input type="text" name="cvv" placeholder="CVV" required onChange={handleChange} />

            <button type="submit">Place Order</button>
        </form>
        </div>
    );
};

export default CheckoutPage;
