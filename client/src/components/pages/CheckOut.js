import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactQuill from 'react-quill'; //ES6
import 'react-quill/dist/quill.snow.css'; //ES6

import { toast } from 'react-toastify';

//function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from '../functions/users';

const CheckOute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSave, setAddressSave] = useState(false);


  const handleSaveAddress = () => {
    console.log(address);
    saveAddress(user.token, address)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          toast.success('Save Address Success!');
          setAddressSave(true);
        }
      }).catch((err) => {
        console.log(err.response.data);
        toast.error('Save Address Error!');
      });
  }

  const handleCreateOrder = () => {
    saveOrder(user.token)
      .then((res) => {
        console.log(res.data);
        emptyCart(user.token)
          .then((res) => {
            console.log(res.data);
            toast.success('Save Order Success!');

          }).catch((err) => {
            console.log(err.response.data);
            toast.error('Save Order Error!');
          });

          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          })
          //loacalStorage
          if(typeof window !== 'undefined'){
            localStorage.removeItem('cart');
          }

      }).catch((err) => {
        console.log(err.response.data);

      });

  }

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      }).catch((err) => {
        console.log(err.response.data);
      });

  }, []);


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>Address</h4>
          <br />
          text area
          <ReactQuill
            value={address}
            onChange={setAddress} />
          <button
            className='btn btn-primary m-2'
            onClick={handleSaveAddress}>Save Address</button>
        </div>
        <div className='col-md-6'>
          <h4>Order Summary</h4>
          <hr />
          <p>Product {products.length}</p>
          <hr />
          <p>List of Product</p>
          {products.map((item, index) =>
            <div key={index}>
              <p>
                {item.product.title} x {item.count} = {item.price * item.count}
              </p>
            </div>

          )}
          <hr />
          Total : <b>{total}</b>
          <button
            disabled={!addressSave || !products.length}
            onClick={handleCreateOrder}
            className='btn btn-primary m-3'
          >Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default CheckOute;