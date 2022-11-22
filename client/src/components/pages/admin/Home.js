import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import { toast } from 'react-toastify';


//function
import {
  listProduct,
  removeProduct,
} from "../../functions/product.js";
import AdminProductCard from "../../cards/AdminProductCard";


const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemove = (id) => {
    if (window.confirm("Delete product Sure!")) {
      removeProduct(user.token, id)
        .then((res) => {
          setLoading(false);
          toast.success(`Deleted ${res.data.title} product Success`);

          console.log(res.data);
          loadData(user.token,100)
        }).catch((err) => {
          setLoading(false);
          toast.error("Remove product failed!");
          console.log(err.response.data);
        });
    }

  }

  useEffect(() => {
    loadData(user.token, 100);

  }, []);

  const loadData = (authtoken, count) => {
    setLoading(true);
    listProduct(authtoken, count)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setProduct(res.data);
      }).catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading
            ? <h1>Loading...<Spin /></h1>
            : <h1>Home ADMIN</h1>
          }
          <div className="row">
            {
              product.map((item) => (
                <div key={item._id} className="col-md-4 pb-3">
                  <AdminProductCard
                    product={item}
                    handleRemove={handleRemove} />
                </div>

              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
