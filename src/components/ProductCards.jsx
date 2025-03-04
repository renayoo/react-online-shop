// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
        <img src={product.imageUrl} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.discountedPrice}</p>
        <Link to={`/product/${product.id}`}>
            <button>View Product</button>
        </Link>
        </div>
    );
};

export default ProductCard;
