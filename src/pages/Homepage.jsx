// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react'; 

const Homepage = () => {
    // State to store the products
    const [products, setProducts] = useState([]);
    // State to handle loading state
    const [loading, setLoading] = useState(true);
    // State to handle errors
    const [error, setError] = useState(null);

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
    }, []); // Empty dependency array means this runs once on component mount

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
            <div>
                <h2>Product List</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product.id} className="border-b p-4">
                            <img src={product.image.url} alt={product.image.alt} className="w-48 h-48 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{product.title}</h3>
                            <p>{product.description}</p>
                            <p className="text-lg font-bold">${product.discountedPrice.toFixed(2)} <span className="line-through text-gray-500">${product.price.toFixed(2)}</span></p>
                            <p>Rating: {product.rating} stars</p>
                            <p>Tags: {product.tags.join(', ')}</p>
                            <div>
                                <h4>Reviews:</h4>
                                <ul>
                                    {product.reviews.map((review) => (
                                        <li key={review.id} className="text-sm text-gray-700">
                                            <strong>{review.username}</strong>: {review.description} (Rating: {review.rating} stars)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Homepage;
