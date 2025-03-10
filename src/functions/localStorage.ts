import { Product } from "@/types/ProductTypes";
import { dispatchCartUpdatedEvent } from "./cartEvents";

interface LocalStorageItem {
    key: string | Product[] | any;
    value: any;
    setCart?: React.Dispatch<React.SetStateAction<Product[]>> | any
}

export const addToLocalStorage = ({ key, value }: LocalStorageItem) => {

    try {
        let existingItem = localStorage.getItem(key);
        let newValue: any = {};

        if (existingItem) {
            try {
                newValue = JSON.parse(existingItem) || {};
                newValue[value._id] = value;
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (error) {
                console.warn(`Invalid JSON in localStorage for key "${key}", resetting.`);
                newValue = {};
            }
        }

        newValue[value._id] = value;

        localStorage.setItem(key, JSON.stringify(newValue));
        console.log(`Updated localStorage for key "${key}":`, newValue);
        dispatchCartUpdatedEvent();


    } catch (err) {
        console.error("Error updating localStorage:", err);
    }
};



export const removeItemFromLocalStorage = ({ key, value, setCart }: LocalStorageItem) => {
    const parsedKey = key
    try {
        const updatedCart = parsedKey.filter((product: any) => product._id !== value._id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        if (localStorage.getItem('cart') === '[]') localStorage.removeItem('cart');
        dispatchCartUpdatedEvent();

    } catch (err) {
        console.error("Error updating localStorage:", err);

    }
};
