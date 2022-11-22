import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get("http://localhost:5000/api/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post("http://localhost:5000/api/change-status", value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, value) => {
  return await axios.post("http://localhost:5000/api/change-role", value, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete("http://localhost:5000/api/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const resetPassword = async (authtoken, id, values) => {
  return await axios.put("http://localhost:5000/api/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post("http://localhost:5000/api/user/cart",
    { cart }, {
    headers: {
      authtoken,
    },
  });
};

export const getUserCart = async (authtoken) => {
  return await axios.get("http://localhost:5000/api/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete("http://localhost:5000/api/user/cart", {
    headers: {
      authtoken,
    },
  });
};

//Save Address
export const saveAddress = async (authtoken, address) => {
  return await axios.post("http://localhost:5000/api/user/address",
    { address }, {
    headers: {
      authtoken,
    },
  });
};

//Save Order
export const saveOrder = async (authtoken) => {
  return await axios.post("http://localhost:5000/api/user/order", {}, {
    headers: {
      authtoken,
    },
  });
};
//Get Order user
export const getOrders = async (authtoken) => {
  return await axios.get("http://localhost:5000/api/user/orders", {
    headers: {
      authtoken,
    },
  });
};

//Wishlist
export const getWishList = async (authtoken) => {
  return await axios.get("http://localhost:5000/api/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post("http://localhost:5000/api/user/wishlist",
    {
      productId
    },
    {
      headers: {
        authtoken,
      },
    });
};

export const removeWishList = async (authtoken, productId) => {
  return await axios.put("http://localhost:5000/api/user/wishlist/"+productId,{},
    {
      headers: {
        authtoken,
      },
    });
};