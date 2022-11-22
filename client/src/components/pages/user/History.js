import React, { useState, useEffect } from "react";
import MenubarUser from "../../layouts/MenubarUser";
import { useDispatch, useSelector } from 'react-redux';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

import Invoice from "../../order/Invoice";

//function
import {
  getOrders,
} from '../../functions/users';



const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      }).catch((err) => {
        console.log(err.response.data);
      });
  }
  console.log(orders)

  useEffect(() => {
    loadData();

  }, [])

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row">
            <h1>History Page</h1>
            {orders.map((item, index) => {

              return <div key={index} className="card m-3">
                <p>Order {'  ' + item.orderstatus}</p>
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
                <div className="row">
                  <div className="col">
                    <PDFDownloadLink
                      document={
                        <Invoice order={item}/>
                      }
                      fileName="invoice.pdf"
                      className="btn btn-primary m-1"
                      >
                      PDF Dowload
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>

            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default History;
