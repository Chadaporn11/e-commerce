import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductTableInCart from '../cards/ProductTableInCart';


const Cart = () => {
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currenValue, nextValue) => {
            return currenValue + nextValue.count * nextValue.price
        }, 0);
    }

    const handleSaveOrder = () => {

    }

    const showCartItem = () => {
        return (
            <table className='table table-bordered'>
                <thead className='thead-light'>
                    <tr>
                        <td>Image</td>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Count</td>
                        <td>Remove</td>
                    </tr>
                </thead>
                {cart.map((item) =>
                    <ProductTableInCart key={item._id} item={item}/>
                )}


            </table>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8'>
                    <h4>Cart / {cart.length} product</h4>
                    {!cart
                        ? <p>No Product in Cart</p>
                        : showCartItem()
                    }
                </div>

                <div className='col-md-4'>
                    <h4>Summary</h4>
                    <hr />
                    {
                        cart.map((item, index) =>
                            <p key={index}>
                                {item.title} x {item.count} = {item.price * item.count}
                            </p>
                        )
                    }

                    <hr />
                    <h4>Total:
                        <b> {getTotal()}</b>
                    </h4>
                    <hr />
                    {user
                        ? <button
                            className='btn btn-success'
                            onClick={handleSaveOrder}
                            disabled={!cart.length}>Check Out</button>
                        : <Link
                            to="/login"
                            state="cart">
                            <button className='btn btn-danger'>
                                Login to Check Out
                            </button>
                        </Link>
                    }

                </div>

            </div>

        </div>
    )
}

export default Cart