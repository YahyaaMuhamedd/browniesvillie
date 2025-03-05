export function ArrayConverter(object: string | null): any[] {
    if (!object) return [];

    try {
        const parsedObject = JSON.parse(object);

        if (Array.isArray(parsedObject)) {
            return parsedObject;
        }

        return Object.values(parsedObject);
    } catch (error) {
        console.error("Error parsing cart data:", error);
        return [];
    }
}