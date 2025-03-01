interface LocalStorageItem {
    key: string;
    value: any;
}

export const addToLocalStorage = ({ key, value }: LocalStorageItem) => {
    try {
        const existingItem = localStorage.getItem(key);

        const newValue = existingItem ? JSON.parse(existingItem) : {};

        newValue[value._id] = value;

        localStorage.setItem(key, JSON.stringify(newValue));
        console.log(`Updated localStorage for key "${key}":`, newValue);
        return newValue;
    } catch (err) {
        console.error("Error updating localStorage:", err);
    }
};

