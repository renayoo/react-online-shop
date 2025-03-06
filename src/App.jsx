// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductIdPage";
import CartPage from "./pages/CartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";

function App() {
    console.log("App component is rendering"); // Debugging log

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Layout>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
