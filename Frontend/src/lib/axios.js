// const axios = require("axios");

// module.exports = {
//     axiosInstanace : (req, res) => {
//         const axiosInstance = axios.create({
//             baseURL: "http://localhost:3000/api", 
//             withCredentials: true
//         });
//     }
// }

// /src/lib/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});
