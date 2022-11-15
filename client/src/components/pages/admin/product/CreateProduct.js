import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import FileUpload from "./FileUpload";
import { Spin } from 'antd';

//function
import {
    createProduct,
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

const CreateProduct = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialstate);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        //console.log(e.target.name, e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        createProduct(user.token, values)
            .then((res) => {
                console.log(res);
                toast.success('Insert Product ' + res.data.title + " Success!");
                window.location.reload();
            }).catch((err) => {
                console.log(err.response.data);
                toast.error('Error insert product!')

            });
    }

    const loadData = () => {
        listCategory()
            .then((res) => {
                console.log(res.data);
                setValues({ ...values, categories: res.data })
            }).catch((err) => {
                console.log(err.response.data);
            })
    }
    console.log('value:', values)

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
                    ?<h1>Loading...<Spin/></h1>
                    :<h1>Create Product Page</h1>
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
                            >
                                <option>Please Select</option>
                                {
                                    values.categories.length > 0 &&
                                    values.categories.map((item) =>
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
                        setLoading={setLoading}/>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateProduct;
