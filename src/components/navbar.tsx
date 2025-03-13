"use client";
import { useEffect, useState } from "react";
import FavoriteIcon from "@/assets/SVG/favorite";
import ShoppingcartIcon from "@/assets/SVG/shopping_cart_checkout";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import BrawniesvllieLogo from "@/assets/SVG/Brawniesville";
import useCartLength from "@/hooks/useCartLength";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";
import { fetchUserData } from "@/services/userServices";
import Button from "@/ReusableComp/Button";
import AuthModal from "./Auth/authModel";
import { setToken } from "@/store/Slices/authSlice";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDesktop = useWindowSize();
    const cartLength = useCartLength();
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
        }
    }, [dispatch]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const navLinks = ["Menu", "Best Seller", "About Us", "Contact Us"];
    const isMounted = typeof window !== "undefined";

    return (
        <nav className="contain mx-auto mb-8 max-md:mb-0">
            <div className="py-4 px-6 flex items-center justify-between z-50 mb-10">
                <BrawniesvllieLogo />
                {isMounted && isDesktop ? (
                    <div className="flex space-x-4 justify-between">
                        <Link href="/Cart" className="text-secondColor cursor-pointer relative">
                            <span className="absolute bg-red-600 w-5 h-5 rounded-full -top-2 -right-2 text-secondColor flex items-center justify-center text-center text-sm">
                                {cartLength || 0}
                            </span>
                            <ShoppingcartIcon />
                        </Link>
                        <div className="w-full">
                            <FavoriteIcon />
                        </div>
                        {!isAuthenticated ? (
                            <AuthModal onClose={() => { }} setDynamicTitle={() => { }} />
                        ) : (
                            <div className="flex items-center gap-2 flex-row">
                                <p>Hello</p>
                                <p className="text-secondColor text-2xl">{user?.name?.split(" ")[0]}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <Button handleclick={toggleMenu} buttonName="Open Menu" cssClasses="w-fit" />
                )}
            </div>

            {isMounted && isDesktop && (
                <div className="flex w-2/3 py-2 px-4 rounded-xl items-center justify-center gap-12 mx-auto bg-bgSecondColor shadow-xl shadow-black/25 border-2 border-bgSecondColor">
                    {navLinks.map((link, index) => (
                        <Link key={index} href="/" className="text-secondColor">{link}</Link>
                    ))}
                </div>
            )}

            {isMounted && isMenuOpen && (
                <div className="w-full bg-bgSecondColor p-4 flex flex-col items-center">
                    {navLinks.map((link, index) => (
                        <Link key={index} href="/" className="w-full text-secondColor">{link}</Link>
                    ))}
                    <div className="flex justify-evenly mt-3 w-full">
                        <Link href="/Cart" className="text-secondColor cursor-pointer relative">
                            <p className="absolute bg-red-600 w-5 h-5 rounded-full top-0 right-0 text-secondColor flex items-center justify-center text-sm">
                                {cartLength || 0}
                            </p>
                            <ShoppingcartIcon />
                        </Link>
                        <FavoriteIcon />
                        {!isAuthenticated ? (
                            <AuthModal onClose={() => { }} setDynamicTitle={() => { }} />
                        ) : (
                            <p className="text-secondColor text-2xl">{user?.name?.split(" ")[0]}</p>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
