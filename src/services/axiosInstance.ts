import axios from "axios";

const token = localStorage.getItem("token") || "";
console.log("Token from localStorage:", token, "Token from localStorage:", JSON.stringify(token));
const AxiosInstance = axios.create({
    baseURL: process.env.DOMAIN,
    headers: {
        'Content-Type': 'application/json',
        Authorization: token,

    },

})

export default AxiosInstance