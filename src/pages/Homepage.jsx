// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://v2.api.noroff.dev/online-shop');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError("Oops! Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return (
        <div className="text-center text-red-500">
            {error}
            <button 
                onClick={fetchProducts} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
            >
                Retry
            </button>
        </div>
    );

    const calculateDiscount = (price, discountedPrice) => {
        if (price > discountedPrice) {
            return (((price - discountedPrice) / price) * 100).toFixed(0);
        }
        return 0;
    };

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    const renderStars = (rating) => {
        const maxStars = 5;
        const roundedRating = Math.round(rating);
        return (
            <span className="text-yellow-500">
                {'★'.repeat(roundedRating)}
                {'☆'.repeat(maxStars - roundedRating)}
            </span>
        );
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Store</h1>

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredProducts.map((product) => {
                    const discount = calculateDiscount(product.price, product.discountedPrice);
                    return (
                        <div key={product.id} className="p-4 rounded-lg shadow-lg bg-gray-100 flex flex-col justify-between h-full">
                            <Link to={`/product/${product.id}`} className="block">
                                <img
                                    src={product.image.url}
                                    alt={product.image.alt}
                                    className="w-full h-52 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                />
                            </Link>

                            <div className="flex flex-col flex-grow justify-between mt-3">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-gray-600 text-sm flex-grow">{product.description}</p>

                                <div className="mt-2">
                                    {product.discountedPrice < product.price ? (
                                        <div>
                                            <p className="text-lg font-bold text-green-600">
                                                ${product.discountedPrice.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-500 line-through">
                                                Was: ${product.price.toFixed(2)}
                                            </p>
                                            <p className="text-xs font-semibold text-red-500">
                                                Save {discount}%!
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                                    )}
                                </div>

                                <div className="mt-2 text-sm flex items-center">
                                    {renderStars(product.rating)}
                                    <span className="ml-2 text-gray-700">({product.rating.toFixed(1)})</span>
                                </div>

                                <button
                                    onClick={() => handleViewProduct(product.id)}
                                    className="mt-4 w-full bg-[#B7B1F2] text-white py-2 rounded-lg shadow-md hover:bg-[#A59EDD] transition-all duration-300"
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;
