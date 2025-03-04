// src/pages/ProductIdPage.jsx
import { useParams } from 'react-router-dom';

const ProductIdPage = () => {
    const { id } = useParams(); // Get the product ID from the URL

    return <div>Product ID Page (under construction). Product ID: {id}</div>;
};

export default ProductIdPage;
