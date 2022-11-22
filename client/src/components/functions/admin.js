import axios from "axios";

//Get Order admin
export const getOrdersAdmin = async (authtoken) => {
    return await axios.get("http://localhost:5000/api/admin/orders", {
      headers: {
        authtoken,
      },
    });
  };

export const updateStatusOrder = async (authtoken, orderId, orderstatus) => {
    return await axios.put("http://localhost:5000/api/admin/order-status", 
    {
        orderId, orderstatus

    },{
      headers: {
        authtoken,
      },
    });

};