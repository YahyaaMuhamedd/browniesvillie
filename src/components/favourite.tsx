"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/Redux";
import { setHrefLocation, setMessage } from "@/store/Slices/feedBackSlice";
import { addToLocalStorage } from "@/functions/localStorage";

import { Product } from "@/types/ProductTypes";
import { ArrayConverter } from "@/helpers/arrayConverter";

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesData = localStorage.getItem("favorites");
                const cartItems = localStorage.getItem("cart");

                if (cartItems) {
                    setCart(ArrayConverter(cartItems));
                }

                if (favoritesData) {
                    // Parse favorites directly from localStorage since they're stored as full product objects
                    const favoriteProducts = ArrayConverter(favoritesData);
                    setFavorites(favoriteProducts);
                }
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();

        // Listen for favorites updates
        const handleFavoritesUpdate = () => {
            const favoritesData = localStorage.getItem("favorites");
            if (favoritesData) {
                setFavorites(ArrayConverter(favoritesData));
            } else {
                setFavorites([]);
            }
        };

        window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
        return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    }, []);

    const removeFromFavorites = (productId: string) => {
        const updatedFavorites = favorites.filter(product => product._id !== productId);
        setFavorites(updatedFavorites);

        // Update localStorage with the updated favorites array
        if (updatedFavorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
            localStorage.removeItem("favorites");
        }

        // Dispatch custom event to update navbar counter
        window.dispatchEvent(new Event('favoritesUpdated'));

        dispatch(setMessage("Removed from favorites"));
        dispatch(setHrefLocation(""));
    };

    const addToCart = (product: Product) => {
        const existingProduct = cart.find(item => item._id === product._id);

        if (existingProduct) {
            dispatch(setMessage("Product Already In Cart"));
            dispatch(setHrefLocation("Cart"));
        } else {
            addToLocalStorage({
                key: 'cart',
                value: product,
            });
            setCart(prev => [...prev, product]);
            dispatch(setMessage(`${product.title} Added To Cart`));
            dispatch(setHrefLocation('Cart'));
        }
    };

    const isInCart = (productId: string) => {
        return cart.some(item => item._id === productId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-100 via-zinc-200 to-orange-100/20">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-[#B15D26]/20 border-t-[#B15D26] rounded-full animate-spin"></div>
                        </div>
                        <p className="text-2xl text-[#B15D26] font-semibold mt-6">Loading Favorites...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-zinc-200 to-orange-100/20">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-4 bg-red-100 rounded-full">
                            <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#B15D26] mb-4">
                        My Favorites
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {favorites.length > 0
                            ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'item' : 'items'}`
                            : "Your favorite products will appear here"
                        }
                    </p>
                </div>

                {/* Favorites Grid */}
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {favorites.map((product) => (
                            <div
                                key={product._id}
                                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#B15D26]/20 hover:-translate-y-2"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    {product.image && (
                                        <Image
                                            src={product.image}
                                            width={400}
                                            height={300}
                                            alt={product.title}
                                            className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    )}

                                    {/* Remove from Favorites Button */}
                                    <button
                                        onClick={() => removeFromFavorites(product._id)}
                                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:scale-110"
                                        title="Remove from favorites"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>

                                    {/* Price Badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <div className="bg-[#B15D26] text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize group-hover:text-[#B15D26] transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {product.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={isInCart(product._id)}
                                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${isInCart(product._id)
                                                ? 'bg-green-100 text-green-700 border-2 border-green-200 cursor-not-allowed'
                                                : 'bg-[#B15D26] hover:bg-[#8B4A1F] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                                }`}
                                        >
                                            {isInCart(product._id) ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    In Cart
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                                                    </svg>
                                                    Add to Cart
                                                </span>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => removeFromFavorites(product._id)}
                                            className="w-full py-2 px-4 rounded-xl font-medium text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                                        >
                                            Remove from Favorites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-700 mb-4">No Favorites Yet</h3>
                        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                            Start adding products to your favorites by clicking the heart icon on any product.
                        </p>
                        <a
                            href="/menu"
                            className="inline-flex items-center gap-2 bg-[#B15D26] hover:bg-[#8B4A1F] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Browse Products
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;