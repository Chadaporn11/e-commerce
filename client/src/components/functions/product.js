import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post("http://localhost:5000/api/product", value,{
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async (authtoken) => {
    return await axios.get("http://localhost:5000/api/category",{
      headers: {
        authtoken,
      },
    });
  };