import { useState } from "react";

export const useInputChange = <T extends Record<string, any>>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSelectChange = (fieldName: string, selectedValue: string | null) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: selectedValue || "", // Ensure a default value is set
        }));
    };

    const updateOrderItems = (orderItems: Array<{ productId: string; name: string; quantity: number; price: number }>) => {
        setFormData((prevData) => ({
            ...prevData,
            orderItems,
        }));
    };

    return { formData, handleInputChange, setFormData, handleSelectChange, updateOrderItems };
};