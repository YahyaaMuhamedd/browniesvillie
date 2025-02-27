'use client';

import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        // Only run this effect on the client side
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsDesktop(window.innerWidth >= 768);
            };

            // Set the initial value
            handleResize();

            // Add event listener for window resize
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return isDesktop;
};

export default useWindowSize;