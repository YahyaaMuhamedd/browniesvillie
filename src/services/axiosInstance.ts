import axios from "axios";


const AxiosInstance = axios.create({
    baseURL: process.env.DOMAIN,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
})

export default AxiosInstance