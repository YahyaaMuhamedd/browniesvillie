"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { fetchProductsQuery } from "@/services/ProductServices";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { addToLocalStorage } from "@/functions/localStorage";
import { setHrefLocation, setMessage } from "@/store/Slices/feedBackSlice";
import { Product } from "@/types/ProductTypes";
import { useQuery } from "@tanstack/react-query";
import FavoriteIcon from "@/assets/SVG/favorite";
import { ArrayConverter } from "@/helpers/arrayConverter";

const ProductCard: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);
    const dispatch = useAppDispatch();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductsQuery,
    });

    useEffect(() => {
        const fetchCart = async () => {
            const cartLocalStorage = localStorage.getItem("cart");
            if (cartLocalStorage) {
                setCart(ArrayConverter(cartLocalStorage));
            }
        };

        const fetchFavorites = async () => {
            const favoritesLocalStorage = localStorage.getItem("favorites");
            if (favoritesLocalStorage) {
                setFavorites(ArrayConverter(favoritesLocalStorage));
            }
        };

        fetchCart();
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

    const toggleFavorite = (product: Product) => {
        const isFavorite = favorites.some(fav => fav._id === product._id);

        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(fav => fav._id !== product._id);
            setFavorites(updatedFavorites);

            if (updatedFavorites.length > 0) {
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            } else {
                localStorage.removeItem("favorites");
            }

            dispatch(setMessage("Removed from favorites"));
        } else {
            // Add to favorites
            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            dispatch(setMessage(`${product.title} added to favorites`));
        }

        // Dispatch event to update other components
        window.dispatchEvent(new Event('favoritesUpdated'));
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

    const isFavorite = (productId: string) => {
        return favorites.some(fav => fav._id === productId);
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-100 via-[#B15D26] to-orange-100/30">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-[#B15D26]/20 border-t-[#B15D26] rounded-full animate-spin"></div>
                        </div>
                        <p className="text-2xl text-[#B15D26] font-semibold mt-6">Loading Products...</p>
                        <p className="text-gray-600 mt-2">Please wait while we fetch the latest items</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/30">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
                            <p className="text-red-600">{error?.toString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/30">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#B15D26] mb-4">
                        Our Products
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our carefully curated collection of premium products
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-8">
                    {data?.map((product: Product) => {
                        const existingProduct = cart.find((item) => item._id === product._id);
                        const productIsFavorite = isFavorite(product._id);

                        return (
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

                                    {/* Favorite Button */}
                                    <button
                                        onClick={() => toggleFavorite(product)}
                                        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${productIsFavorite
                                            ? 'bg-[#B15D26] text-white shadow-lg'
                                            : 'bg-white/90 text-gray-400 hover:text-[#B15D26] hover:bg-white'
                                            } backdrop-blur-sm transform hover:scale-110`}
                                        title={productIsFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <FavoriteIcon />
                                    </button>

                                    {/* Price Badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <div className="bg-[#B15D26] text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 md:p-6">
                                    <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 capitalize group-hover:text-[#B15D26] transition-colors duration-300">
                                        {truncateText(product.title, 25)}
                                    </h3>
                                    <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed">
                                        {truncateText(product.description, 80)}
                                    </p>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => addToCart(product)}
                                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${existingProduct
                                            ? 'bg-green-100 text-green-700 border-2 border-green-200 hover:bg-green-200'
                                            : 'bg-[#B15D26] hover:bg-[#8B4A1F] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                            }`}
                                    >
                                        {existingProduct ? (
                                            <span className="flex items-center justify-center gap-2 md:text-base text-sm">
                                                <svg className="w-4 h-4 md:w-5  md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                In Cart
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2 md:text-base text-sm">
                                                <svg className="w-4 h-4 md:w-5  md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                                                </svg>
                                                Add to Cart
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {data && data.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                        <p className="text-gray-500">We're working on adding new products. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;