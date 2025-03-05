// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const Homepage = () => {
    // State to store the products
    const [products, setProducts] = useState([]);
    // State for loading, error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // State for the search query
    const [searchQuery, setSearchQuery] = useState('');
    
    // Function to fetch product list from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://v2.api.noroff.dev/online-shop');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.data); // Store the fetched products in state
            } catch (error) {
                setError(error.message); // Handle any errors that occur
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        // Fetch the product list when the component mounts
        fetchProducts();
    }, []);

    // Filter products based on the search query
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Render loading, error, or product list
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Welcome to the Homepage</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <h2>Product List</h2>
                <div className="grid grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-md">
                            {/* Make the image clickable */}
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image.url}
                                    alt={product.image.alt}
                                    className="w-full h-48 object-cover mb-4 cursor-pointer"
                                />
                            </Link>
                            <h3 className="text-xl font-semibold">{product.title}</h3>
                            <p>{product.description}</p>
                            <p className="text-lg font-bold">
                                ${product.discountedPrice.toFixed(2)}{' '}
                                <span className="line-through text-gray-500">
                                    ${product.price.toFixed(2)}
                                </span>
                            </p>
                            <p>Rating: {product.rating} stars</p>
                            <p>Tags: {product.tags.join(', ')}</p>
                            <div className="mt-4">
                                {/* View Product Button */}
                                <Link
                                    to={`/product/${product.id}`}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
