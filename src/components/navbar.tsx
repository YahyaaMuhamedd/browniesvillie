"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FavoriteIcon from "@/assets/SVG/favorite";
import ShoppingcartIcon from "@/assets/SVG/shopping_cart_checkout";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import BrawniesvllieLogo from "@/assets/SVG/Brawniesville";
import useCartLength from "@/hooks/useCartLength";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";
import { fetchUserData } from "@/services/userServices";
import { setToken } from "@/store/Slices/authSlice";
import BurgerIcon from "@/assets/BurgerIcon";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import User from "@/assets/SVG/person";
const AuthModal = React.lazy(() => import("./Auth/authModel"));

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDesktop = useWindowSize();
    const { length } = useCartLength();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state: RootState) => state.user);
    const { token, userId } = useAppSelector((state: RootState) => state.auth);

    // Store token and userId in localStorage after login
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    }, [token, userId]);

    // Fetch user data when page reloads
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            dispatch(setToken(storedToken)); // Set token in Redux
            dispatch(fetchUserData(storedUserId)); // Fetch user data
            console.log(dispatch(fetchUserData(storedUserId)))
        }
    }, [dispatch]);

    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const navLinks = useMemo(() => ["Menu", "Best Seller", "About Us", "Contact Us"], []);

    const isMounted = typeof window !== "undefined";

    return (
        <nav className="contain mx-auto mb-8 max-md:mb-0">
            <div className="py-4 px-6 flex items-center justify-between z-50 mb-10">
                <Link href="/" className="flex items-center gap-2">
                    <BrawniesvllieLogo />
                </Link>
                {isMounted && isDesktop ? (
                    <div className="flex space-x-4 justify-between items-center">
                        <Link href="/Cart" className="text-secondColor cursor-pointer relative">
                            <span className="absolute bg-red-600 w-5 h-5 rounded-full -top-2 -right-2 text-secondColor flex items-center justify-center text-center text-sm">
                                {length || 0}
                            </span>
                            <ShoppingcartIcon />
                        </Link>
                        <div className="w-full cursor-pointer">
                            <FavoriteIcon />
                        </div>
                        <Link href="/dashboard" className="w-full cursor-pointer">
                            {isAuthenticated ? <User /> : null}
                        </Link>
                        {!isAuthenticated ? (
                            <AuthModal onClose={() => { }} setDynamicTitle={() => { }} />
                        ) : (
                            <div className="flex items-start gap-[2px] flex-col justify-start">
                                <p className="text-mainColor text-lg font-semibold">Hello</p>
                                <p className="text-secondColor text-2xl font-bold"> {capitalizeFirstLetter(user?.name?.split(" ")[0])} </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <BurgerIcon isOpen={isMenuOpen} toggle={toggleMenu} />
                )}
            </div>

            {isMounted && isDesktop && (
                <div className="flex w-2/3 py-2 px-4 rounded-xl items-center justify-center gap-12 mx-auto bg-bgSecondColor shadow-xl shadow-black/25 border-2 border-bgSecondColor">
                    {navLinks.map((link, index) => (
                        <Link key={index} href="/" className="text-secondColor">{link}</Link>
                    ))}
                </div>
            )}

            {isMounted && isMenuOpen && !isDesktop && (
                <div className="w-full bg-bgSecondColor p-4 flex flex-col items-center">
                    {navLinks.map((link, index) => (
                        <Link key={index} href="/" className="w-full text-secondColor">{link}</Link>
                    ))}
                    <div className="flex justify-evenly mt-3 w-full">
                        <Link href="/Cart" className="text-secondColor cursor-pointer relative">
                            <p className="absolute bg-red-600 w-5 h-5 rounded-full top-0 right-0 text-secondColor flex items-center justify-center text-sm">
                                {length || 0}
                            </p>
                            <ShoppingcartIcon />
                        </Link>
                        <FavoriteIcon />
                        <Link href="/dashboard" className=" cursor-pointer">
                            {isAuthenticated ? <User /> : null}
                        </Link>
                        {!isAuthenticated ? (
                            <AuthModal onClose={() => { }} setDynamicTitle={() => { }} />
                        ) : (
                            <div className="flex items-start gap-[2px] flex-col justify-start">
                                <p className="text-mainColor text-lg font-semibold">Hello</p>
                                <p className="text-secondColor text-2xl font-bold"> {capitalizeFirstLetter(user?.name?.split(" ")[0])} </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
