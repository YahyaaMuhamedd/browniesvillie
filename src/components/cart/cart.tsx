'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import Button from "@/ReusableComp/Button";
import { decrement, increment } from "@/store/Slices/quantitySlice";
import { Product } from "@/types/ProductTypes";
import { RootState } from "@/store/store";
import { removeItemFromLocalStorage } from "@/functions/localStorage";
import { setMessage, setHrefLocation } from "@/store/Slices/feedBackSlice";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/ReusableComp/loadingSpinner";
import "./cart.css"; // Import the separate CSS file

const OrderSumarry = dynamic(() => import("./orderSumarry"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCart = async () => {
            if (typeof window !== "undefined") {
                const cartLocalStorage = await localStorage.getItem("cart");
                if (cartLocalStorage) {
                    setCart(ArrayConverter(cartLocalStorage));
                }
            };
        }

        fetchCart();
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * (quantities[item._id] || 1), 0);

    return (
        <div className="min-h-screen text-secondColor contain relative overflow-hidden mt-2 rounded-md">
            {/* Enhanced Background with more #B15D26 prominence */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/90 via-zinc-200/80 to-[#B15D26]/95"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#B15D26]/20 to-[#B15D26]/40"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-[#B15D26]/10 via-transparent to-[#B15D26]/30"></div>

            {/* Animated background particles */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-32 h-32 bg-[#B15D26]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-60 right-40 w-24 h-24 bg-[#A84707]/30 rounded-full blur-lg animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-[#B15D26]/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-[#B15D26]/25 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Content with glass morphism */}
            <div className="relative z-10 p-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl px-8 py-4 border border-[#B15D26]/30 shadow-lg">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#B15D26] to-[#A84707] bg-clip-text text-transparent mb-2">
                            Shopping Cart
                        </h1>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#B15D26] to-[#A84707] mx-auto rounded-full"></div>
                    </div>
                </div>

                {/* Cart Items - Single Column Layout */}
                <div className="space-y-6 max-w-4xl mx-auto">
                    {cart?.map((item: Product) => {
                        const quantity = quantities[item._id] || 1;
                        return (
                            <div
                                key={item._id}
                                className="cart-item group relative bg-white/25 backdrop-blur-lg p-6 rounded-2xl border border-[#B15D26]/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-[#B15D26]/70"
                            >
                                {/* Animated border gradient */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B15D26]/50 via-[#A84707]/50 to-[#B15D26]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

                                {/* Top accent line */}
                                <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#B15D26] to-transparent rounded-b-full"></div>

                                <div className="flex max-sm:justify-center justify-between flex-wrap items-center max-md:flex-col gap-6">
                                    <div className="flex items-center justify-center flex-row flex-wrap gap-3 max-md:flex-col">
                                        {/* Image Section */}
                                        {item.image && (
                                            <div className="relative group/image flex-[1_1_30%] min-w-[170px] flex justify-center">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#B15D26]/30 to-[#A84707]/30 rounded-xl blur opacity-75 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                                                <Image
                                                    src={item.image}
                                                    width={120}
                                                    height={120}
                                                    alt={item.title}
                                                    className="relative rounded-xl max-sm:w-full max-sm:h-auto shadow-lg ring-2 ring-[#B15D26]/30 group-hover/image:ring-[#B15D26]/60 transition-all duration-300 transform group-hover/image:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#B15D26]/20 to-transparent rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        )}

                                        {/* Title & Price Section */}
                                        <div className="flex flex-col flex-[1_1_30%] min-w-[170px] justify-center items-center md:items-start gap-4 text-center md:text-left">
                                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-[#B15D26] bg-clip-text text-transparent mb-2">
                                                {item.title}
                                            </h2>
                                            <div className="inline-block bg-[#B15D26]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#B15D26]/40">
                                                <p className="text-[#B15D26] font-bold text-xl">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center  min-w-[170px] justify-center bg-white/30 backdrop-blur-md rounded-full p-2 border border-[#B15D26]/40 shadow-lg">
                                        <Button
                                            buttonName="-"
                                            cssClasses="quantity-btn w-10 h-10 rounded-full bg-gradient-to-r from-[#B15D26] to-[#A84707] text-white font-bold shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            handleclick={() => {
                                                if (quantity > 1) {
                                                    dispatch(decrement(item._id));
                                                }
                                            }}
                                        />
                                        <span className="mx-6 text-2xl font-bold text-[#B15D26] min-w-[3rem] text-center bg-white/50 rounded-lg py-2 px-4 backdrop-blur-sm border border-[#B15D26]/30">
                                            {quantity}
                                        </span>
                                        <Button
                                            buttonName="+"
                                            cssClasses="quantity-btn w-10 h-10 rounded-full bg-gradient-to-r from-[#B15D26] to-[#A84707] text-white font-bold shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
                                            handleclick={() => dispatch(increment(item._id))}
                                        />
                                    </div>

                                    {/* Remove Button */}
                                    <div className="flex max-lg:m-auto justify-center items-center">
                                        <Button
                                            buttonName="Remove"
                                            cssClasses="remove-btn px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-400/50 backdrop-blur-sm"
                                            handleclick={() => {
                                                removeItemFromLocalStorage({ key: cart, value: item, setCart });
                                                dispatch(setMessage(`${item.title} Removed From Cart`));
                                                dispatch(setHrefLocation(''));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty cart message */}
                    {cart.length === 0 && (
                        <div className="text-center py-16">
                            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-[#B15D26]/30 shadow-xl">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#B15D26] to-[#A84707] rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#B15D26] mb-2">Your cart is empty</h3>
                                <p className="text-gray-600">Add some items to get started!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Summary - Rendered outside as popup/modal */}
            <OrderSumarry total={total} />
        </div>
    );
};

export default Cart;