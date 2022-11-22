import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import { toast } from 'react-toastify';

import {
    getOrdersAdmin,
    updateStatusOrder,
} from '../../functions/admin';

const Orders = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const loadData = () => {
        getOrdersAdmin(user.token)
            .then((res) => {
                setOrders(res.data);

            }).catch((err) => {
                console.log(err.response.data);

            });
    }
    console.log(orders);

    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.token, orderId, orderstatus)
            .then((res) => {
                console.log(res.data);
                toast.info('Updated ' + res.data.orderstatus + ' Success!');
                loadData();
            }).catch((err) => {
                console.log(err.response.data);
                toast.error('Error updating order status!');
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

                <div className="col text-center">
                    {loading
                        ? <h1>Loading...<Spin /></h1>
                        : <h1>Management Orders</h1>
                    }
                    {orders.map((item, index) => {

                        return <div key={index} className="card m-3">
                            <p>Order by <b>{item.orderBy.username}</b>
                                <br/>{'  ' + item.orderstatus}</p>
                            <select
                                value={item.orderstatus}
                                onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                                style={{ width: '200px', alignSelf: 'center' }}
                                className="form form-control">
                                <option value="Not Process">Not Process</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td>Title</td>
                                        <td>Price</td>
                                        <td>Count</td>
                                    </tr>
                                </thead>
                                {item.products.map((p, i) =>
                                    <tr>
                                        <td>{p.product.title}</td>
                                        <td>{p.price}</td>
                                        <td>{p.count}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan={3}>ราคาสุทธิ: <b><u>{item.cartTotal}</u></b></td>
                                </tr>

                            </table>
                        </div>

                    })}
                </div>

            </div>
        </div>
    )
}

export default Orders;