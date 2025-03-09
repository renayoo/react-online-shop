import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ErrorBoundary = ({ children }) => {
    const [error, setError] = useState(null);

    // Catching errors in child components (like App)
    try {
        return children;
    } catch (err) {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Root render error:', err);
        return <div className="text-center text-red-500">Something went wrong.</div>;
    }
};

root.render(
    <ErrorBoundary>
        <CartProvider>
            <div
                style={{
                    background: 'linear-gradient(to bottom, #FBF3B9, #FFDCCC, #FDB7EA)',
                    minHeight: '100vh',
                    margin: 0,
                }}
            >
                <App />
            </div>
        </CartProvider>
    </ErrorBoundary>
);
