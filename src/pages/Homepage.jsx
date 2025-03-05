// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();  // Initialize navigate function

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

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        // Title and tags
        return (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Function to calculate discount percentage
    const calculateDiscount = (price, discountedPrice) => {
        if (price > discountedPrice) {
            const discount = ((price - discountedPrice) / price) * 100;
            return discount.toFixed(0); // Returns the discount percentage
        }
        return 0;
    };

    // Handle button click to navigate to the product page
    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);  // Navigate to product detail page
    };

    return (
        <div>
            <h1>Welcome to the Homepage</h1>

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
                    {filteredProducts.map((product) => {
                        const discount = calculateDiscount(product.price, product.discountedPrice);
                        return (
                            <div key={product.id} className="border p-4 rounded-lg shadow-md">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image.url}
                                        alt={product.image.alt}
                                        className="w-full h-48 object-cover mb-4 cursor-pointer"
                                    />
                                </Link>
                                <h3 className="text-xl font-semibold">{product.title}</h3>
                                <p>{product.description}</p>

                                {/* Display price or discounted price */}
                                {product.discountedPrice < product.price ? (
                                    <>
                                        <p className="text-lg font-bold">
                                            On sale for: ${product.discountedPrice.toFixed(2)}{' '}
                                            <span className="line-through text-gray-500">
                                                Original Price: ${product.price.toFixed(2)}
                                            </span>
                                        </p>
                                        <p className="text-green-500 font-semibold">
                                            Save {discount}%!
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-lg font-bold">Price: ${product.price.toFixed(2)}</p>
                                )}

                                <p>Rating: {product.rating} stars</p>
                                <p>Tags: {product.tags.join(', ')}</p>

                                <div className="mt-4">
                                    {/* Button for viewing the product */}
                                    <button
                                        onClick={() => handleViewProduct(product.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
