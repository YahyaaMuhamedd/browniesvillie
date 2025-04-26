import { Product } from "@/types/ProductTypes";
import { dispatchCartUpdatedEvent } from "./cartEvents";

interface LocalStorageItem {
    key: string | Product[] | any;
    value: any;
    setCart?: React.Dispatch<React.SetStateAction<Product[]>> | any
}

export const addToLocalStorage = async ({ key, value }: LocalStorageItem) => {
    try {
        let existingCart = localStorage.getItem(key);
        let cartArray: Product[] = [];

        if (existingCart) {
            try {
                cartArray = JSON.parse(existingCart) || [];
            } catch (error) {
                console.warn(`Invalid JSON in localStorage for key "${key}", resetting.`);
                cartArray = [];
            }
        }

        // Check if product already exists to prevent duplication
        const productExists = cartArray.some((item) => item._id === value._id);

        if (!productExists) {
            cartArray.push(value);
            localStorage.setItem(key, JSON.stringify(cartArray));
            dispatchCartUpdatedEvent();
            console.log(`Updated cart in localStorage:`, cartArray);
        } else {
            console.log("Product already in cart, not adding again.");
        }

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
