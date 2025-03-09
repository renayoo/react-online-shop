// src/pages/ProductIdPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const ProductIdPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false); 
    const navigate = useNavigate();
    const { addToCart } = useCart();  

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!id) {
                setError('Invalid product ID.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data.data);
            } catch (error) {
                console.error('Error fetching product:', error); // Logs error in console
                setError(error.message);  // This stores the error message for rendering
            } finally {
                setLoading(false);  // Make sure loading is set to false regardless of success or failure
            }
        };

        fetchProductDetails();
    }, [id]);

    const calculateDiscount = (price, discountedPrice) => {
        if (price > discountedPrice) {
            const discount = ((price - discountedPrice) / price) * 100;
            return discount.toFixed(0);
        }
        return 0;
    };

    const handleAddToCart = () => {
        if (!product) {
            console.error('No product to add to cart');
            return;
        }
        addToCart(product);  // Add the current product to the cart
        setShowMessage(true); // Show the "Item added" message

        // Hide the message after 3 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 3000); // 3000ms = 3 seconds
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to the homepage (product list)
    };

    // Function to generate star rating display
    const renderStars = (rating) => {
        const maxStars = 5;
        return [...Array(maxStars)].map((_, i) => (
            <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-400"}>★</span>
        ));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const discount = calculateDiscount(product.price, product.discountedPrice);

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="flex-1 mb-6 md:mb-0">
                    <img
                        src={product.image.url}
                        alt={product.image.alt}
                        className="w-full h-96 object-cover mb-4 rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 ml-6">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>

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

                    <div className="mt-4 mb-6">
                        <p className="text-lg font-semibold">Rating:</p>
                        <div className="flex mt-2">
                            {renderStars(product.rating)}
                            <span className="ml-2 text-gray-700">({product.rating.toFixed(1)})</span>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-4">Tags: {product.tags.join(', ')}</p>

                    <div className="mt-4 mb-6">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2 bg-[#B7B1F2] text-white rounded-md shadow-md hover:bg-[#A59EDD] transition-all duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-4 mb-6">
                        <button
                            onClick={handleBackClick}
                            className="w-full py-2 bg-[#FDB7EA] text-white rounded-md shadow-md hover:bg-[#F8A8D1] transition-all duration-300"
                        >
                            Back to Products
                        </button>
                    </div>

                    {/* Item Added Message (Under "Back to Products" button) */}
                    {showMessage && (
                        <p className="mt-2 text-black text-center">
                            Item added to cart!
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 bg-white border-t-2 border-gray-300 rounded-lg shadow-lg mt-6">
                <h4 className="text-xl font-semibold mb-4">Reviews:</h4>
                <ul>
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review) => (
                            <li key={review.id} className="flex items-start mb-4 p-4 border-b-2 border-gray-200">
                                {/* Rating with Stars */}
                                <div className="mr-4">
                                    {renderStars(review.rating)}
                                </div>

                                {/* Review Text */}
                                <div className="flex-1">
                                    <strong>{review.username}</strong>
                                    <p className="text-sm text-gray-700">{review.description}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No reviews yet.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProductIdPage;
