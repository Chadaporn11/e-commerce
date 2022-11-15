import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

import { toast } from 'react-toastify';
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import { Spin } from 'antd';


//function
import {
    readProduct,
    updateProduct,
} from '../../../functions/product';
import {
    listCategory,
} from '../../../functions/category';

const initialstate = {
    title: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    images: [],
};

const UpdateProduct = () => {

    const params = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    
    const [values, setValues] = useState(initialstate);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = () => {
        readProduct(user.token, params.id)
            .then((res) => {
                setValues({ ...values, ...res.data});
            }).catch((err) => {
                console.log(err.response.data);
            });

        listCategory()
            .then((res) => {
                setCategory(res.data);
            }).catch((err) => {
                console.log(err.response.data);
            });
    }
    console.log("value:", values)
    console.log("category:", category)

    const handleChange = (e) => {
        //console.log(e.target.name, e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(values);
        updateProduct(user.token, values._id, values)
            .then((res) => {
                console.log(res);
                setLoading(false);
                toast.success('Update Product ' + res.data.title + " Success!");
                navigate('/admin/index');
            }).catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error('Error update product!')

            });
    }



    useEffect(() => {
        loadData();
    }, []);



    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-2">
                    <MenubarAdmin />
                </div>

                <div className="col">
                    {loading
                        ? <h1>Loading...<Spin /></h1>
                        : <h1>Update Product Page</h1>
                    }

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>description</label>
                            <input
                                className="form-control"
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>price</label>
                            <input
                                className="form-control"
                                type="number"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>quantity</label>
                            <input
                                className="form-control"
                                type="number"
                                name="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>category</label>
                            <select
                                className="form-control"
                                name="category"
                                onChange={handleChange}
                                value={values.category._id}
                            >
                                <option>Please Select</option>
                                {
                                    category.length > 0 &&
                                    category.map((item) =>
                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >{item.name}</option>
                                    )}
                            </select>
                        </div>
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            loadind={loading}
                            setLoading={setLoading} />
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default UpdateProduct;