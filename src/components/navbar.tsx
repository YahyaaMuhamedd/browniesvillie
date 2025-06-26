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
    const [favoritesCount, setFavoritesCount] = useState(0);
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
            dispatch(setToken(storedToken));
            dispatch(fetchUserData(storedUserId));
        }
    }, [dispatch]);

    // Update favorites count
    useEffect(() => {
        const updateFavoritesCount = () => {
            const favorites = localStorage.getItem("favorites");
            if (favorites) {
                const favoritesArray = JSON.parse(favorites);
                setFavoritesCount(favoritesArray.length);
            } else {
                setFavoritesCount(0);
            }
        };

        updateFavoritesCount();

        // Listen for storage changes
        window.addEventListener('storage', updateFavoritesCount);

        // Custom event for favorites updates
        window.addEventListener('favoritesUpdated', updateFavoritesCount);

        return () => {
            window.removeEventListener('storage', updateFavoritesCount);
            window.removeEventListener('favoritesUpdated', updateFavoritesCount);
        };
    }, []);

    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const navLinks = useMemo(() => [
        { label: "Menu", url: "/menu" },
        { label: "Best Seller", url: "/best-seller" },
        { label: "About Us", url: "/about-us" },
        { label: "Contact Us", url: "/contact-us" },
    ], []);

    const isMounted = typeof window !== "undefined";

    const IconWithBadge = ({ href, icon, count, label }: {
        href: string;
        icon: React.ReactNode;
        count: number;
        label: string;
    }) => (
        <Link href={href} className="relative group">
            <div className="p-2 rounded-full hover:bg-[#B15D26]/10 transition-colors duration-200">
                {icon}
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                        {count > 99 ? '99+' : count}
                    </span>
                )}
            </div>
            <span className="sr-only">{label}</span>
        </Link>
    );

    const UserSection = () => (
        <div className="flex items-center space-x-4">
            <IconWithBadge
                href="/cart"
                icon={<ShoppingcartIcon />}
                count={length || 0}
                label="Shopping Cart"
            />
            <IconWithBadge
                href="/favourites"
                icon={
                    <svg className="w-6 h-6 text-[#B15D26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                }
                count={favoritesCount}
                label="Favorites"
            />

            {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                    <Link href="/dashboard" className="p-2 rounded-full hover:bg-[#B15D26]/10 transition-colors duration-200">
                        <User />
                    </Link>
                    <div className="flex flex-col items-start">
                        <p className="text-[#B15D26] text-sm font-medium">Hello</p>
                        <p className="text-gray-700 text-lg font-bold">
                            {capitalizeFirstLetter(user?.name?.split(" ")[0] || "")}
                        </p>
                    </div>
                </div>
            ) : (
                <AuthModal onClose={() => { }} setDynamicTitle={() => { }} />
            )}
        </div>
    );

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <BrawniesvllieLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    {isMounted && isDesktop ? (
                        <UserSection />
                    ) : (
                        <BurgerIcon isOpen={isMenuOpen} toggle={toggleMenu} />
                    )}
                </div>

                {/* Desktop Navigation Links */}
                {isMounted && isDesktop && (
                    <div className="pb-4">
                        <div className="flex items-center justify-center space-x-8 bg-gradient-to-r from-[#B15D26]/5 to-[#B15D26]/10 rounded-full py-3 px-6 shadow-sm">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className="text-gray-700 hover:text-[#B15D26] font-medium transition-colors duration-200 relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B15D26] transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMounted && isMenuOpen && !isDesktop && (
                    <div className="pb-4 border-t border-gray-100 mt-4">
                        <div className="flex flex-col space-y-2 py-4">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className="text-gray-700 hover:text-[#B15D26] font-medium py-2 px-4 rounded-lg hover:bg-[#B15D26]/5 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-around">
                                <IconWithBadge
                                    href="/cart"
                                    icon={<ShoppingcartIcon />}
                                    count={length || 0}
                                    label="Shopping Cart"
                                />
                                <IconWithBadge
                                    href="/favourites"
                                    icon={
                                        <svg className="w-7 h-7 text-[#B15D26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    }
                                    count={favoritesCount}
                                    label="Favorites"
                                />

                                {isAuthenticated ? (
                                    <Link href="/dashboard" className="p-2 rounded-full hover:bg-[#B15D26]/10 transition-colors duration-200">
                                        <User />
                                    </Link>
                                ) : (
                                    <AuthModal onClose={() => { }} setDynamicTitle={() => { }} />
                                )}
                            </div>

                            {isAuthenticated && (
                                <div className="flex flex-col items-center mt-4 p-4 bg-[#B15D26]/5 rounded-lg">
                                    <p className="text-[#B15D26] text-sm font-medium">Hello</p>
                                    <p className="text-gray-700 text-lg font-bold">
                                        {capitalizeFirstLetter(user?.name?.split(" ")[0] || "")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;