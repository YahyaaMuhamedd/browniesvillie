import { setNestedValue } from "@/helpers/setNestedValue";
import { useState } from "react";

export const useInputChange = <T extends Record<string, any>>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData };
            setNestedValue(newData, name, value);
            return newData;
        });
    };

    const handleSelectChange = (fieldName: string, selectedValue: string | null) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            setNestedValue(newData, fieldName, selectedValue || "");
            return newData;
        });
    };

    const updateOrderItems = (orderItems: Array<{ productId: string; name: string; quantity: number; price: number }>) => {
        setFormData((prevData) => ({
            ...prevData,
            orderItems,
        }));
    };

    const resetFormData = () => {
        setFormData(initialState);
    };

    return { formData, handleInputChange, setFormData, handleSelectChange, updateOrderItems, resetFormData };
};
