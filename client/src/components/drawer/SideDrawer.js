import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Drawer } from 'antd';

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }));

    const onCloseDrawer = () => {
        dispatch({
            type: "SET_VISIBLE",
            payload: false
        });
    }

    return (
        <Drawer
            onClose={onCloseDrawer}
            title={"Cart " + cart.length + " product"}
            placement="right"
            visible={drawer}>
            {cart.map((item) =>
                <div className='row'>
                    <div className='col'>
                        <img
                            style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                            src={item.images[0].url}
                        />
                        <p className='text-center bg-secondary text-light'>
                            {item.title} x {item.count}
                        </p>


                    </div>
                </div>
            )}
            <Link to="/cart">
                <button 
                onClick={onCloseDrawer}
                className='text-center btn btn-primary'>
                    Go To Cart
                </button>
            </Link>

        </Drawer>
    )
}

export default SideDrawer;