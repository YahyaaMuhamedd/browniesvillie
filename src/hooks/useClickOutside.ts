import { useEffect } from "react";

const useClickOutside = (
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void,
    toggleElementRef?: React.RefObject<HTMLElement | null> // Optional ref for the button/icon
) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return; // Click inside dropdown, do nothing
            }

            if (toggleElementRef?.current && toggleElementRef.current.contains(event.target as Node)) {
                return; // Click on toggle button, do nothing
            }

            callback(); // Click outside, close dropdown
        };

        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [ref, callback, toggleElementRef]);
};

export default useClickOutside;
