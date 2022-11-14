import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import SingleProductCard from '../cards/SingleProductCard';
//function

import {
    readProduct,
} from '../functions/product';

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState([]);

    const loadData = () => {
        readProduct(params.id)
            .then((res) => {
                setProduct(res.data);
            }).catch((err) => {
                console.log(err.response.data);
            })
    }

    useEffect(() => {
        loadData();

    }, []);

    return (
        <div className='container-fluid'>
            <div className='row pt-4'>
                <SingleProductCard product={product}/>
            </div>

            <div className='row'>

            </div>
        </div>
    )
}

export default Product;