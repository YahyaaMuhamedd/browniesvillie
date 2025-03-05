'use client';

import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import Button from "@/ReusableComp/Button";
import { decrement, increment } from "@/store/Slices/quantitySlice";
import { Product } from "@/types/ProductTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store"; // استيراد RootState
import OrderForm from "../orderForm";

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);
    const dispatch = useAppDispatch();
    useEffect(() => {

        const cartLocalStorage = localStorage.getItem('cart');
        console.log('Cart data from localStorage:', cartLocalStorage); // تحقق من البيانات
        const cartData: any = ArrayConverter(cartLocalStorage);
        setCart(cartData);
    }, [quantities]); // Add `quantities` as a dependency

    // حساب الإجمالي
    const total = cart.reduce((sum, item) => sum + item.price * (quantities[item._id] || 1), 0);

    return (
        <div className="min-h-screen bg-[#1E1E1E] text-secondColor p-6">
            <h1 className="text-3xl font-bold text-mainColor mb-8">Your Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* قائمة المنتجات */}
                <div className="md:col-span-2">
                    {cart.map((item: Product) => {
                        const quantity = quantities[item._id] || 1; // قيمة افتراضية للكمية إذا لم تكن موجودة
                        return (
                            <div key={item._id} className="bg-[#101010] p-4 rounded-lg border border-[#A84707] mb-4">
                                <div className="flex items-center space-x-4">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            width={200}
                                            height={200}
                                            alt={item.title}
                                            className="rounded-lg mb-4"
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.title}</h2>
                                        <p className="text-[#BEB9B6]">${item.price.toFixed(2)}</p>
                                        <div className="text-[#BEB9B6]">
                                            Quantity: {quantity}
                                            <Button
                                                buttonName="+"
                                                cssClasses="px-4 py-2"
                                                handleclick={() => dispatch(increment(item._id))} // زيادة الكمية
                                            />
                                            <Button
                                                buttonName="-"
                                                cssClasses="px-4 py-2"
                                                handleclick={() => {
                                                    if (quantity > 1) {
                                                        dispatch(decrement(item._id)); // تقليل الكمية
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-4 text-[#B15D26] hover:text-[#A84707]"
                                    onClick={() => {
                                        const updatedCart = cart.filter((product) => product._id !== item._id);
                                        setCart(updatedCart);
                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* ملخص الطلب */}
                <div className="bg-[#101010] p-6 rounded-lg border border-[#A84707] h-fit">
                    <h2 className="text-2xl font-bold text-[#B15D26] mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>$5.00</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax</p>
                            <p>$2.50</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p>Total</p>
                            <p>${(total + 5 + 2.5).toFixed(2)}</p>
                        </div>
                    </div>

                    <OrderForm />
                </div>
            </div>
        </div>
    );
};

export default Cart;