"use client";

import { useState } from "react";
import FavoriteIcon from "@/assets/SVG/favorite";
import SearchIcon from "@/assets/SVG/search";
import ShoppingcartIcon from "@/assets/SVG/shopping_cart_checkout";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import BrawniesvllieLogo from "@/assets/SVG/Brawniesville";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDesktop = useWindowSize();

    console.log("Navbar re-rendered, isDesktop:", isDesktop);
    const toggleMenu = (() => setIsMenuOpen((prev) => !prev));

    return (
        <>
            <nav className="container mx-auto">

                <div className="bg-white text-orange-400 py-4 px-6 flex items-center justify-between z-50">
                    {/* Left Side */}

                    {/* Center Logo */}
                    <h1><BrawniesvllieLogo /></h1>

                    {/* Right Icons */}
                    {isDesktop ? (
                        <div className="flex space-x-4">
                            <SearchIcon />
                            <ShoppingcartIcon />
                            <FavoriteIcon />
                        </div>
                    ) : (
                        <button onClick={toggleMenu}>
                            yahya
                        </button>
                    )}

                </div>
                {isDesktop && (
                    <div className="flex py-2 px-4 rounded-xl items-center justify-center gap-8 bg-[#0000006d]">
                        <Link href="/" className="text-[#BEB9B6]">Menu</Link>
                        <Link href="/" className="text-[#BEB9B6]">Best Seller</Link>
                        <Link href="/" className="text-[#BEB9B6]">About Us</Link>
                        <Link href="/" className="text-[#BEB9B6]">Contact Us</Link>
                    </div>
                )}
                {/* Mobile Menu */}
                {isMenuOpen && !isDesktop && (
                    <div className=" w-full bg-white p-4 flex flex-col items-center ">
                        <Link href="/" className="w-full">Menu</Link>
                        <Link href="/" className="w-full">Best Seller</Link>
                        <Link href="/" className="w-full">About Us</Link>
                        <Link href="/" className="w-full">Contact Us</Link>
                        <div className="flex items-start p-2">
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
