'use client';

import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsDesktop(window.innerWidth >= 768);
            };

            handleResize();

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return isDesktop;
};

export default useWindowSize;