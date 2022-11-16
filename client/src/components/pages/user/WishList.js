import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import MenubarUser from "../../layouts/MenubarUser";

//function
import {
  getWishList,
  removeWishList,
} from "../../functions/users";

const WishList = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [wishlist, setWishlist] = useState([]);

  const handleRemove = (productId) => {
    removeWishList(user.token, productId)
      .then((res) => {
        console.log(res.data);
        loadData();

      }).catch((err) => {
        console.log(err.response.data);
      });
  }

  const loadData = () => {
    getWishList(user.token)
      .then((res) => {
        setWishlist(res.data.wishlist);

      }).catch((err) => {
        console.log(err.response.data);
      })
  }

  useEffect(() => {
    loadData();

  }, [])



  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className="row">
            <h1>WishList</h1>
            {wishlist.map((item, index) =>
              <div
                className="alert alert-secondary"
                key={index}>
                {item.title}
                <span
                  onClick={() => handleRemove(item._id)}
                  style={{ float: 'right' }}>ลบ</span>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default WishList;
