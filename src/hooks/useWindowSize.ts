'use client'
import { useEffect, useRef, useState } from "react";

const useWindowSize = () => {
    const isClient = typeof window !== "undefined";
    const isDesktopRef = useRef(isClient ? window.innerWidth >= 768 : true);
    const [, forceRender] = useState(0); // لإجبار التحديث عند تغيير الحجم

    useEffect(() => {
        if (!isClient) return;
        const handleResize = () => {
            const newIsDesktop = window.innerWidth >= 768;
            if (isDesktopRef.current !== newIsDesktop) {
                isDesktopRef.current = newIsDesktop;
                forceRender(prev => prev + 1); // تحديث مرة واحدة فقط عند التغيير
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isDesktopRef.current;
};

export default useWindowSize;
