export const getNestedValue = (obj: any, path?: string) => {
    if (!path || typeof path !== "string") return undefined;
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
};
