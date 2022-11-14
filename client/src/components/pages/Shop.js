import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../cards/ProductCard';

//function
import {
    listProduct,
    searchFilters,

} from '../functions/product';


const Shop = () => {

    const { search } = useSelector((state) => ({ ...state }))
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const { text } = search;

    const loadData = () => {
        setLoading(true);

        listProduct(12)
            .then((res) => {
                setLoading(false);
                setProduct(res.data);
            }).catch((err) => {
                setLoading(false);
                console.log(err.response.data);
            });
    }

    useEffect(() => {

        loadData();

    }, []);

    //load data on user filter
    useEffect(() => {

        const delay = setTimeout(()=>{
            fetchDataFilter({ query: text });
        },300)
        return ()=> clearTimeout(delay)

    }, [text]);

    //Filter
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then((res) => {
                setProduct(res.data);
            });
    }



    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        Filter / Search
                    </div>
                    <div className='col-md-9'>
                        {loading
                            ? <h4 className='text-danger'>Loading...</h4>
                            : <h4 className='text-info'>Product</h4>
                        }
                        {product.length < 1 && <p>No Product found</p>}

                        <div className='row pb-5'>
                            {product.map((item, index) =>
                                <div key={index} className="col-md-4 mt-3">
                                    <ProductCard product={item} />
                                </div>

                            )}

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Shop;