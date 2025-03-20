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

const OrderSumarry = React.lazy(() => import("./orderSumarry"));

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);
    const dispatch = useAppDispatch();

    useEffect(() => {

        const fetchCart = async () => {
            const cartLocalStorage = await localStorage.getItem("cart");
            if (cartLocalStorage) {
                setCart(ArrayConverter(cartLocalStorage));
            }
        };

        fetchCart();
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * (quantities[item._id] || 1), 0);

    return (
        <div className="min-h-screen bg-background text-secondColor contain">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    {cart?.map((item: Product) => {
                        const quantity = quantities[item._id] || 1;
                        return (
                            <div key={item._id} className="bg-bgSecondColor p-2 rounded-lg border border-color mb-4">
                                <div className="flex max-sm:justify-center justify-between flex-wrap items-center max-md:flex-col gap-3">

                                    <div className="flex items-center flex-wrap justify-center max-md:flex-col flex-row gap-4">
                                        {item.image && (
                                            <Image
                                                src={item.image}
                                                width={100}
                                                height={100}
                                                alt={item.title}
                                                className="rounded-lg max-sm:w-full max-sm:h-1/2"
                                            />
                                        )}
                                        <div className="flex flex-col justify-center items-center md:flex-row gap-4">
                                            <h2 className="text-xl font-semibold">{item.title}</h2>
                                            <p className="text-secondColor font-bold">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center ">
                                            <Button
                                                buttonName="-"
                                                cssClasses=""
                                                handleclick={() => {
                                                    if (quantity > 1) {
                                                        dispatch(decrement(item._id));
                                                    }
                                                }}
                                            />
                                            <span className="mx-4 text-lg font-semibold">{quantity}</span>
                                            <Button
                                                buttonName="+"
                                                cssClasses=""
                                                handleclick={() => dispatch(increment(item._id))}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex max-lg:m-auto justify-center items-center">

                                        <Button
                                            buttonName="Remove"
                                            cssClasses="px-4 hover:bg-hoverColor flex justify-end items-end"
                                            handleclick={() => {
                                                removeItemFromLocalStorage({ key: cart, value: item, setCart }),
                                                    dispatch(setMessage(`${item.title} Removed From Cart`)),
                                                    dispatch(setHrefLocation(''));

                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        );
                    })}
                </div>

                <OrderSumarry total={total} />
            </div>
        </div>
    );
};

export default Cart;