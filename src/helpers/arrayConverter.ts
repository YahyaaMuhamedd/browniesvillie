export function ArrayConverter(object: any) {
    if (object) {
        try {
            const parsedObject = JSON.parse(object);

            const cartArray = Object.values(parsedObject);
            return cartArray
        } catch (error) {
            console.error("Error parsing cart data:", error);
            return [];
        }
    }
}