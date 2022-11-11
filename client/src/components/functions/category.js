import axios from "axios";

export const createCategory = async ( value) => {
    return await axios.post("http://localhost:5000/api/category", value);
  };