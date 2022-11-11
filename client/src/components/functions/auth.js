import axios from "axios";

export const register = async (value) =>
  await axios.post("http://localhost:5000/api/register", value);

export const login = async (value) =>
  await axios.post("http://localhost:5000/api/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post("http://localhost:5000/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post("http://localhost:5000/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}
