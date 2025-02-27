"use client";

import { useState, useEffect } from "react";
import FavoriteIcon from "@/assets/SVG/favorite";
import SearchIcon from "@/assets/SVG/search";
import ShoppingcartIcon from "@/assets/SVG/shopping_cart_checkout";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import BrawniesvllieLogo from "@/assets/SVG/Brawniesville";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDesktop = useWindowSize(); // Can be `undefined` during server render
    console.log(isDesktop)

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    // Only render UI that depends on `isDesktop` after the component has mounted
    const isMounted = typeof window !== "undefined";

    return (
        <>
            <nav className="contain mx-auto mb-8 max-md:mb-0">
                <div className="text-orange-400 py-4 px-6 flex items-center justify-between z-50 mb-10">
                    {/* Left Side */}
                    <BrawniesvllieLogo />

                    {/* Right Icons */}
                    {isMounted && isDesktop ? ( // Only render if mounted and isDesktop
                        <div className="flex space-x-4">
                            <SearchIcon />
                            <ShoppingcartIcon />
                            <FavoriteIcon />
                        </div>
                    ) : (
                        <button onClick={toggleMenu}>yaya</button>
                    )}
                </div>

                {isMounted && isDesktop && ( // Only render if mounted and isDesktop
                    <div className="flex w-2/3 py-2 px-4 rounded-xl items-center justify-center gap-12 mx-auto bg-bgSecondColor shadow-xl shadow-black/25 border-2 border-bgSecondColor">
                        <Link href="/" className="text-[#BEB9B6]">Menu</Link>
                        <Link href="/" className="text-[#BEB9B6]">Best Seller</Link>
                        <Link href="/" className="text-[#BEB9B6]">About Us</Link>
                        <Link href="/" className="text-[#BEB9B6]">Contact Us</Link>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMounted && isMenuOpen && !isDesktop && ( // Only render if mounted and isMenuOpen
                    <div className="w-full bg-bgSecondColor  p-4 flex flex-col items-center">
                        <Link href="/" className="w-full text-[#BEB9B6]">Menu</Link>
                        <Link href="/" className="w-full text-[#BEB9B6]">Best Seller</Link>
                        <Link href="/" className="w-full text-[#BEB9B6]">About Us</Link>
                        <Link href="/" className="w-full text-[#BEB9B6]">Contact Us</Link>
                        <div className="flex justify-evenly mt-3 w-full">
                            <SearchIcon />
                            <ShoppingcartIcon />
                            <FavoriteIcon />
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;