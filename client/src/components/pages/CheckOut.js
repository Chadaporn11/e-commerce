import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//function
import { 
  getUserCart,
} from '../functions/users';

const CheckOute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total , setTotal] = useState(0);

  useEffect(() => {
    getUserCart(user.token)
    .then((res)=> {
      console.log(res);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    }).catch((err)=> {
      console.log(err.response.data);
    });

  },[]);


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>Address</h4>
          <br />
          text area
        </div>
        <div className='col-md-6'>
          <h4>Order Summary</h4>
          <hr />
          <p>Product {products.length}</p>
          <hr />
          <p>List of Product</p>
          {products.map((item,index)=>
          <div key={index}>
            <p>
              {item.product.title} x {item.count} = {item.price * item.count}
            </p>
          </div>
          
          )}
          <hr/>
          Total : <b>{total}</b>
        </div>
      </div>
    </div>
  )
}

export default CheckOute;