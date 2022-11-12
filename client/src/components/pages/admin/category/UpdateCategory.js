import React, { useEffect, useState } from 'react';
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//function
import {
    readCategory,
    editCategory,
} from '../../../functions/category';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";


const UpdateCategory = () => {

    const navigate = useNavigate();
    const param = useParams();
    //console.log(param.id)
    const [name, setName] = useState("");
    const { user } = useSelector((state) => ({ ...state }));

    const loadData = (authtoken,id) => {
        readCategory(authtoken,id)
            .then((res) => {
                setName(res.data.name);
            }).catch((err) => {
                console.log(err.response.data);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name)
        editCategory(user.token,param.id, { name })
            .then((res) => {
                navigate('/admin/create-category');
                toast.success("Update "+res.data.name+" Success!");
            }).catch((err) => {
                console.log(err.response.data);
                toast.error('Error update data!')
            })

    }

    useEffect(() => {
        loadData(user.token,param.id);

    }, [])

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-2">
                    <MenubarAdmin />
                </div>

                <div className="col">
                    <h1>Hello Update Category</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Update Category</label>
                            <input
                                name="name"
                                value={name}
                                autoFocus
                                required
                                onChange={(e) => setName(e.target.value)}
                                className='form-control' />
                            <button className='btn btn-outline-primary'>Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateCategory