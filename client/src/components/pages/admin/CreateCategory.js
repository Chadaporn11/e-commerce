import React, { useState, useEffect } from 'react'
import MenubarAdmin from "../../layouts/MenubarAdmin";

//function
import { createCategory } from '../../functions/category';

const CreateCategory = () => {
    const [values, setValues] = useState({
        name: '',
    })

    const handleChangeCategory = (e) => {
        setValues({...values, [e.target.name]: e.target.value})

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values.name)
        createCategory(values)
        .then((res) =>{
            console.log(res)
        }).catch((err) =>{
            console.log(err.response.data);
        })
    }

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
                    className='form-control'/>
                    <button className='btn btn-outline-primary'>เพิ่ม</button>
                </div>
              </form>

            </div>
    
          </div>
        </div>
      );
}

export default CreateCategory;