export const setNestedValue = (obj: any, path: string, value: any) => {
    if (!path.includes(".")) {
        obj[path] = value;
        return obj;
    }

    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return obj;
};