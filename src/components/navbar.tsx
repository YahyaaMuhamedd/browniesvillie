"use client";
import { useState } from "react";
import FavoriteIcon from "@/assets/SVG/favorite";
import SearchIcon from "@/assets/SVG/search";
import ShoppingcartIcon from "@/assets/SVG/shopping_cart_checkout";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import BrawniesvllieLogo from "@/assets/SVG/Brawniesville";
import useCartLength from "@/hooks/useCartLength";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const isDesktop = useWindowSize();
    const length = useCartLength()

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const isMounted = typeof window !== "undefined";
    console.log("renderd")
    return (
        <>
            <nav className="contain mx-auto mb-8 max-md:mb-0">
                <div className="text-orange-400 py-4 px-6 flex items-center justify-between z-50 mb-10">
                    <BrawniesvllieLogo />

                    {isMounted && isDesktop ? ( // Only render if mounted and isDesktop
                        <div className="flex space-x-4">
                            <SearchIcon />
                            <Link href="/Cart" className="text-[#BEB9B6] cursor-pointer relative">
                                <p className="absolute bg-red-600 w-5 h-5 rounded-full top-0 right-0 text-secondColor flex items-center justify-center text-sm">
                                    {length || 0}
                                </p>
                                <ShoppingcartIcon />
                            </Link>
                            <FavoriteIcon />
                        </div>
                    ) : (
                        <button onClick={toggleMenu}>yaya</button>
                    )}
                </div>

                {isMounted && isDesktop && (
                    <div className="flex w-2/3 py-2 px-4 rounded-xl items-center justify-center gap-12 mx-auto bg-bgSecondColor shadow-xl shadow-black/25 border-2 border-bgSecondColor">
                        <Link href="/" className="text-[#BEB9B6]">Menu</Link>
                        <Link href="/" className="text-[#BEB9B6]">Best Seller</Link>
                        <Link href="/" className="text-[#BEB9B6]">About Us</Link>
                        <Link href="/" className="text-[#BEB9B6]">Contact Us</Link>
                    </div>
                )}

                {isMounted && isMenuOpen && !isDesktop && (
                    <div className="w-full bg-bgSecondColor  p-4 flex flex-col items-center">
                        <Link href="/" className="w-full text-[#BEB9B6]">Menu</Link>
                        <Link href="/" className="w-full text-[#BEB9B6]">Best Seller</Link>
                        <Link href="/" className="w-full text-[#BEB9B6]">About Us</Link>
                        <Link href="/" className="w-full text-[#BEB9B6]">Contact Us</Link>
                        <div className="flex justify-evenly mt-3 w-full">
                            <SearchIcon />
                            <Link href="/Cart" className="text-[#BEB9B6] cursor-pointer relative">
                                <p className="absolute bg-red-600 w-5 h-5 rounded-full top-0 right-0 text-secondColor flex items-center justify-center text-sm">
                                    {length || 0}
                                </p>
                                <ShoppingcartIcon />
                            </Link>
                            <FavoriteIcon />
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;