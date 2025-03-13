import AxiosInstance from "./axiosInstance";

export const CreateOrder = async (data: any) => {
    try {
        const response = await AxiosInstance.post(`orders`, data)
        console.log(response.data);

        return response.data
    } catch (error: unknown) {
        console.error("Error Sending Order:", error);
        return null
    }
}