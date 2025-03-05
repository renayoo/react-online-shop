// src/pages/ProductIdPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const ProductIdPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();  

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
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
        addToCart(product);  // Add the current product to the cart
        alert('Product added to cart!');
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to the homepage (product list)
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
        <div className="p-4">
            <h1>{product.title}</h1>
            <img
                src={product.image.url}
                alt={product.image.alt}
                className="w-full h-96 object-cover mb-4"
            />
            <p>{product.description}</p>

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

            <div className="mt-4">
                <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Add to Cart
                </button>
            </div>

            <div className="mt-4">
                <button onClick={handleBackClick} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                    Back to Products
                </button>
            </div>
        </div>
    );
};

export default ProductIdPage;
