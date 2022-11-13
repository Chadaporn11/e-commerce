import React, { useState, useEffect } from 'react';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';

//function
import { listProductBy } from '../functions/product';

function NewProduct() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const loadData = () => {
        setLoading(true);
        listProductBy("createdAt", "desc", 3)
            .then((res) => {
                setLoading(false);
                setProducts(res.data);

            }).catch((err) => {
                setLoading(false);
                console.log(err.response.data);
            });

    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div className='container'>
                {loading ? (
                    <LoadingCard count={3}/>
                ) : (
                    <div className='row'>
                        {
                            products.map((item, index) => (
                                <div key={index} className='col-md-4'>
                                    <ProductCard product={item} />
                                </div>
                            ))}
                    </div>

                )}

            </div>
        </>

    )
}

export default NewProduct