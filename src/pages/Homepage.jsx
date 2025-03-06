// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://v2.api.noroff.dev/online-shop');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    const calculateDiscount = (price, discountedPrice) => {
        if (price > discountedPrice) {
            return (((price - discountedPrice) / price) * 100).toFixed(0);
        }
        return 0;
    };

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Function to generate star rating display
    const renderStars = (rating) => {
        const maxStars = 5;
        return [...Array(maxStars)].map((_, i) => (
            <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-400"}>
                ★
            </span>
        ));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Store</h1>

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                                <div className="mt-2 text-sm">{renderStars(product.rating)}</div>

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
