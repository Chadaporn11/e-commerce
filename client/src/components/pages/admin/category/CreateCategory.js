import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


//function
import {
  createCategory,
  listCategory,
  deleteCategory,
} from '../../../functions/category';

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    name: '',
  })
  const [category, setCategory] = useState([]);


  const handleChangeCategory = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.name)
    createCategory(user.token,values)
      .then((res) => {
        console.log(res)
        loadData(user.token);
        toast.success("Insert Data "+res.data.name+" Success!");
      }).catch((err) => {
        console.log(err.response.data);
        toast.error('Error insert data!')
      })
  }

  const handleRemove = (id) => {
    deleteCategory(user.token,id)
      .then((res) => {
        console.log(res)
        loadData(user.token);
        toast.success("Remove Data "+res.data.name+" Success!");

      }).catch((err) => {
        console.log(err.response.data);
        toast.error('Error delete data!')
      })
  }

  const loadData = () => {
    listCategory()
      .then((res) => {
        setCategory(res.data)
      }).catch((err) => {
        console.log(err.response.data);
      })
  }
  console.log('data:', category)


  useEffect(() => {
    loadData();

  }, [])

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>Create Category</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สินค้า</label>
              <input type="text"
                name="name"
                value={values.name}
                onChange={handleChangeCategory}
                className='form-control' />
              <button className='btn btn-outline-primary'>เพิ่ม</button>
            </div>
          </form>
          <hr />
          <ul className="list-group">
            {category.map((item) => (
              <li className="list-group-item">
                {item.name}
                <span
                  style={{ float: 'right' }}
                  className="badge bg-primary rounded-pill"
                  onClick={() => handleRemove(item._id)}
                >x</span>
                <span
                  style={{ float: 'right' }}
                  className="badge bg-primary rounded-pill">
                  <Link to={`/admin/update-category/${item._id}`}>Edit</Link>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default CreateCategory;