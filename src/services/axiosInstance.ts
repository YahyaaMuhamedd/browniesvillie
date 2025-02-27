import axios from "axios";


const AxiosInstance = axios.create({
    baseURL: process.env.DOMAIN,
    headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.TOKEN,

    },

})

export default AxiosInstance