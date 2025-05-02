import axios from "axios";

// Create Axios instance
const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN, // Use NEXT_PUBLIC_ for frontend access
    headers: {
        'Content-Type': 'application/json',
    },
});


// Add token dynamically only in the browser
// if (typeof window !== 'undefined') {
//     const token = localStorage.getItem("token");
//     if (token) {
//         AxiosInstance.defaults.headers.common["Authorization"] = token;
//     }
// }




// Add request interceptor for setting token dynamically
if (typeof window !== "undefined") {
    AxiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

export default AxiosInstance;
