import axios from "axios";
//  server of backend that everything will be sent to, and the token is added to the header of every request if it exists in local storage. This allows for authenticated requests to be made to the backend without having to manually add the token to each request.
const API = axios.create({
  baseURL: "https://skillbridge-lq49.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {

    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error) 
);

export default API;