import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../cards/ProductCard';
//antd
import { Slider, Checkbox } from 'antd';

//function
import {
    listProduct,
    searchFilters,

} from '../functions/product';
import {
    listCategory,

} from '../functions/category';


const Shop = () => {

    const { search } = useSelector((state) => ({ ...state }))
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    //Category
    const [category, setCategory] = useState([]);
    const [categorySelect, setCategorySelect] = useState([]);

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
    //1. Load all Data
    useEffect(() => {

        loadData();
        listCategory().then((res) => setCategory(res.data));

    }, []);

    //2. Load data on user filter
    useEffect(() => {

        const delay = setTimeout(() => {
            fetchDataFilter({ query: text });
            if (!text) {
                loadData();
            }
        }, 300)
        return () => clearTimeout(delay)

    }, [text]);

    //Filter
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then((res) => {
                setProduct(res.data);
            });
    }

    const handlePrice = (value) => {
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 300)

    }
    //3. Load on slider
    useEffect(() => {
        fetchDataFilter({ price });

    }, [ok]);

    const handleCheck = (e) => {
        //ค่าปัจจุบันที่ Check
        let inCheck = e.target.value;
        //ค่าเดิมของ Check
        let inState = [...categorySelect];

        let findCheck = inState.indexOf(inCheck);

        if (findCheck === -1) {
            inState.push(inCheck);
        } else {
            inState.splice(findCheck, 1);
        }

        setCategorySelect(inState);
        console.log(inState);
        fetchDataFilter({ category:inState });
        if (inState.length < 1) {
            loadData();
        }

    }


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        Filter / Search
                        <hr />
                        <h4>ค้นหาด้วยราคาสินค้า</h4>
                        <Slider
                            value={price}
                            onChange={handlePrice}
                            range
                            max={1000} />
                        <hr />
                        <h4>ค้นหาตามหมวดหมู่สินค้า</h4>
                        {category.map((item) =>
                            <Checkbox
                                onChange={handleCheck}
                                value={item._id}
                            >
                                {item.name}
                            </Checkbox>
                        )}

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