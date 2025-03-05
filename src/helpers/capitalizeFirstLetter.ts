export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str; // Return the input if it's empty or null
    return str.charAt(0).toUpperCase() + str.slice(1);
};