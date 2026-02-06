import axios from "axios";

const API = axios.create({
 baseURL:"https://money-manager-backend1-isjt.onrender.com/api"
});

API.interceptors.request.use(req=>{
 const token = localStorage.getItem("token");
 if(token) req.headers.token = token;
 return req;
});

export default API;
