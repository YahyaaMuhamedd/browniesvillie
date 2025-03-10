// hooks/useCartLength.ts
import { useEffect, useState } from "react";
import { ArrayConverter } from "@/helpers/arrayConverter";

const useCartLength = () => {
    const [length, setLength] = useState<number>(0);

    // Fetch cart length from localStorage
    const fetchCartLength = () => {
        const cartLocalStorage = localStorage.getItem("cart");
        if (cartLocalStorage) {
            const cart = ArrayConverter(cartLocalStorage);
            setLength(cart.length);
        } else {
            setLength(0); // If cart is empty, set length to 0
        }
    };

    // Fetch cart length on component mount
    useEffect(() => {
        fetchCartLength();
    }, []);

    // Listen for custom "cartUpdated" event
    useEffect(() => {
        const handleCartUpdated = () => {
            fetchCartLength(); // Update cart length when the event is fired
        };

        window.addEventListener("cartUpdated", handleCartUpdated);
        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdated);
        };
    }, []);

    return length;
};

export default useCartLength;