import axios from "axios";

const domain: string = "https://brownies-villie-back-end.vercel.app/api/"

const AxiosInstance = axios.create({
    baseURL: domain,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
})

export default AxiosInstance