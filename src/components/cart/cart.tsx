'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import Button from "@/ReusableComp/Button";
import { decrement, increment } from "@/store/Slices/quantitySlice";
import { Product } from "@/types/ProductTypes";
import { RootState } from "@/store/store";
import { removeItemFromLocalStorage } from "@/functions/localStorage";
import { OrderSumarry } from "./orderSumarry";
import { setMessage, setHrefLocation } from "@/store/Slices/feedBackSlice";

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
        <div className="min-h-screen bg-background text-secondColor p-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* قائمة المنتجات */}
                <div className="md:col-span-2">
                    {cart?.map((item: Product) => {
                        const quantity = quantities[item._id] || 1;
                        return (
                            <div key={item._id} className="bg-bgSecondColor p-2 rounded-lg border border-color mb-4">
                                <div className="flex justify-between max-sm:justify-center flex-wrap items-center gap-4">

                                    <div className="flex items-center flex-wrap justify-center flex-col">
                                        {item.image && (
                                            <Image
                                                src={item.image}
                                                width={250}
                                                height={250}
                                                alt={item.title}
                                                className="rounded-lg mb-4 max-sm:w-full max-sm:h-full"
                                            />
                                        )}
                                        <div className="flex justify-center items-center flex-col">
                                            <h2 className="text-xl font-semibold">{item.title}</h2>
                                            <p className="text-secondColor">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-4">
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
                                    </div>

                                    <div className="flex">

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