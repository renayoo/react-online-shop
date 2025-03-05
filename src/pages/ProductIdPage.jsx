// src/pages/ProductIdPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductIdPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [id]); // Re-fetch if the product ID changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="p-4">
            <h1>{product.title}</h1>
            <img
                src={product.image.url}
                alt={product.image.alt}
                className="w-full h-96 object-cover mb-4"
            />
            <p>{product.description}</p>
            <p className="text-lg font-bold">
                ${product.discountedPrice.toFixed(2)}{' '}
                <span className="line-through text-gray-500">${product.price.toFixed(2)}</span>
            </p>
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
        </div>
    );
};

export default ProductIdPage;
