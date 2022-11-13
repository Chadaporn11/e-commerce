import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post("http://localhost:5000/api/product", value,{
    headers: {
      authtoken,
    },
  });
};

export const listProduct = async (authtoken, count) => {
  return await axios.get("http://localhost:5000/api/products/" + count, {
    headers: {
      authtoken,
    },
  });
};

export const removeProduct = async (authtoken, id) => {
  return await axios.delete("http://localhost:5000/api/product/"+id,{
    headers: {
      authtoken,
    },
  });
};

export const readProduct = async (authtoken, id) => {
  return await axios.get("http://localhost:5000/api/product/"+id,{
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (authtoken, id, product) => {
  return await axios.put("http://localhost:5000/api/product/"+id, product,{
    headers: {
      authtoken,
    },
  });
};