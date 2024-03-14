import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NbProd() {
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        async function fetchProductCount() {
            try {
                const response = await axios.get('/api/products/count');
                setProductCount(response.data.count);
            } catch (error) {
                console.error('Error fetching product count:', error);
            }
        }

        fetchProductCount();
    }, []);

    return (
        <div>
            <p>Nombre de produits disponibles: {productCount}</p>
        </div>
    );
}

export default NbProd;
